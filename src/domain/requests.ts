import type { LeaveType } from "@prisma/client";
import { prisma } from "@/lib/db";
import { ValidationError } from "./errors";
import { ACTIVE_STATUSES, LeaveStatus, NotificationTarget } from "./enums";
import {
  validateLeaveRequest,
  calendarDays,
  eachIsoDate,
  startOfDay,
  type LeaveTypeRule,
} from "./leave-rules";
import { availableHours } from "./balances";

export function ruleFromType(t: LeaveType): LeaveTypeRule {
  return {
    key: t.key,
    name: t.name,
    unlimited: t.unlimited,
    entitlementHours: t.entitlementHours,
    maxDaysPerRequest: t.maxDaysPerRequest,
    exactDays: t.exactDays,
    maxHoursPerDay: t.maxHoursPerDay,
    incrementHours: t.incrementHours,
    requiresAdvance: t.requiresAdvance,
    requiresProof: t.requiresProof,
  };
}

/** Build the validation context (available hours + per-day bookings) for an employee + type. */
async function buildContext(employeeId: string, type: LeaveType, year: number) {
  const bal = await prisma.leaveBalance.findUnique({
    where: { employeeId_leaveTypeId_year: { employeeId, leaveTypeId: type.id, year } },
  });
  const avail = type.unlimited
    ? Infinity
    : availableHours({
        entitlementHours: bal?.entitlementHours ?? type.entitlementHours ?? 0,
        usedHours: bal?.usedHours ?? 0,
        reservedHours: bal?.reservedHours ?? 0,
      });

  const active = await prisma.leaveRequest.findMany({
    where: { employeeId, leaveTypeId: type.id, status: { in: ACTIVE_STATUSES } },
  });
  const bookedByDate: Record<string, number> = {};
  for (const r of active) {
    const days = calendarDays(r.fromDate, r.toDate);
    const perDay = days ? r.hours / days : r.hours;
    for (const d of eachIsoDate(r.fromDate, r.toDate)) {
      bookedByDate[d] = (bookedByDate[d] ?? 0) + perDay;
    }
  }
  return { avail, bookedByDate };
}

export interface CreateLeaveInput {
  employeeId: string;
  leaveTypeKey: string;
  fromDate: Date;
  toDate: Date;
  hours: number;
  reason?: string;
  retrospective?: boolean;
  hasProof?: boolean;
}

/** Submit a leave request → validates, then RESERVES the hours (does not deduct). */
export async function createLeaveRequest(input: CreateLeaveInput) {
  const type = await prisma.leaveType.findUnique({ where: { key: input.leaveTypeKey } });
  if (!type) throw new ValidationError("Unknown leave type.");
  const year = input.fromDate.getUTCFullYear();

  const { avail, bookedByDate } = await buildContext(input.employeeId, type, year);
  const check = validateLeaveRequest(
    ruleFromType(type),
    { fromDate: input.fromDate, toDate: input.toDate, hours: input.hours, retrospective: input.retrospective, hasProof: input.hasProof },
    { today: startOfDay(new Date()), availableHours: avail, bookedByDate },
  );
  if (!check.ok) throw new ValidationError(check.error!);

  const days = calendarDays(input.fromDate, input.toDate);

  return prisma.$transaction(async (tx) => {
    if (!type.unlimited) {
      await tx.leaveBalance.upsert({
        where: { employeeId_leaveTypeId_year: { employeeId: input.employeeId, leaveTypeId: type.id, year } },
        create: {
          employeeId: input.employeeId,
          leaveTypeId: type.id,
          year,
          entitlementHours: type.entitlementHours ?? 0,
          usedHours: 0,
          reservedHours: input.hours,
        },
        update: { reservedHours: { increment: input.hours } },
      });
    }
    return tx.leaveRequest.create({
      data: {
        employeeId: input.employeeId,
        leaveTypeId: type.id,
        fromDate: input.fromDate,
        toDate: input.toDate,
        hours: input.hours,
        days,
        reason: input.reason,
        retrospective: !!input.retrospective,
        status: LeaveStatus.PENDING,
      },
    });
  });
}

/** Approve/decline a pending request. Approve: reserved → used. Decline: release. Notifies the requester. */
export async function decideLeaveRequest(
  requestId: string,
  decision: typeof LeaveStatus.APPROVED | typeof LeaveStatus.DECLINED,
  deciderId: string,
  reason?: string,
) {
  return prisma.$transaction(async (tx) => {
    const req = await tx.leaveRequest.findUniqueOrThrow({ where: { id: requestId }, include: { leaveType: true } });
    if (req.status !== LeaveStatus.PENDING) throw new ValidationError("Only pending requests can be decided.");
    const year = req.fromDate.getUTCFullYear();

    if (!req.leaveType.unlimited) {
      const where = { employeeId_leaveTypeId_year: { employeeId: req.employeeId, leaveTypeId: req.leaveTypeId, year } };
      if (decision === LeaveStatus.APPROVED) {
        await tx.leaveBalance.update({ where, data: { reservedHours: { decrement: req.hours }, usedHours: { increment: req.hours } } });
      } else {
        await tx.leaveBalance.update({ where, data: { reservedHours: { decrement: req.hours } } });
      }
    }

    const updated = await tx.leaveRequest.update({
      where: { id: requestId },
      data: { status: decision, decidedById: deciderId, decidedAt: new Date(), decisionReason: reason },
    });

    await tx.notification.create({
      data: {
        employeeId: req.employeeId,
        title: `${req.leaveType.name} ${decision === LeaveStatus.APPROVED ? "approved" : "declined"}`,
        body:
          decision === LeaveStatus.APPROVED
            ? `Approved — ${req.hours} hrs deducted from your balance.`
            : `Declined — ${req.hours} hrs returned to your balance.`,
        targetType: NotificationTarget.REQUEST,
        targetId: requestId,
      },
    });
    return updated;
  });
}

/** Cancel / expire a pending request → releases the reserved hours. */
export async function releaseLeaveRequest(
  requestId: string,
  status: typeof LeaveStatus.CANCELLED | typeof LeaveStatus.EXPIRED,
  actorId?: string,
  reason?: string,
) {
  return prisma.$transaction(async (tx) => {
    const req = await tx.leaveRequest.findUniqueOrThrow({ where: { id: requestId }, include: { leaveType: true } });
    if (req.status !== LeaveStatus.PENDING) throw new ValidationError(`Only pending requests can be ${status.toLowerCase()}.`);
    const year = req.fromDate.getUTCFullYear();
    if (!req.leaveType.unlimited) {
      await tx.leaveBalance.update({
        where: { employeeId_leaveTypeId_year: { employeeId: req.employeeId, leaveTypeId: req.leaveTypeId, year } },
        data: { reservedHours: { decrement: req.hours } },
      });
    }
    return tx.leaveRequest.update({
      where: { id: requestId },
      data: { status, decidedById: actorId ?? null, decidedAt: new Date(), decisionReason: reason },
    });
  });
}

export const cancelLeaveRequest = (requestId: string, actorId: string) =>
  releaseLeaveRequest(requestId, LeaveStatus.CANCELLED, actorId, "Cancelled by employee");
