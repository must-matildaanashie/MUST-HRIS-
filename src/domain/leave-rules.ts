import { HOURS_PER_DAY } from "./enums";

/** Rule config for a leave type (subset of the LeaveType model). */
export interface LeaveTypeRule {
  key: string;
  name: string;
  unlimited: boolean;
  entitlementHours: number | null;
  maxDaysPerRequest: number | null;
  exactDays: number | null;
  maxHoursPerDay: number | null;
  incrementHours: number | null;
  requiresAdvance: boolean;
  requiresProof: boolean;
}

export interface LeaveRequestInput {
  fromDate: Date;
  toDate: Date;
  hours: number;
  retrospective?: boolean;
  hasProof?: boolean;
}

export interface ValidationContext {
  today: Date;
  availableHours: number; // Infinity for unlimited types
  /** hours already booked (pending/approved) per ISO date for this leave type */
  bookedByDate?: Record<string, number>;
}

export interface ValidationResult {
  ok: boolean;
  error?: string;
}

export function startOfDay(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

export function isoDate(d: Date): string {
  return startOfDay(d).toISOString().slice(0, 10);
}

export function calendarDays(from: Date, to: Date): number {
  const ms = startOfDay(to).getTime() - startOfDay(from).getTime();
  const d = Math.round(ms / 86_400_000) + 1;
  return d < 1 ? 1 : d;
}

export function eachIsoDate(from: Date, to: Date): string[] {
  const out: string[] = [];
  let cur = startOfDay(from);
  const end = startOfDay(to);
  let guard = 0;
  while (cur.getTime() <= end.getTime() && guard < 400) {
    out.push(cur.toISOString().slice(0, 10));
    cur = new Date(cur.getTime() + 86_400_000);
    guard++;
  }
  return out;
}

/**
 * Validate a leave request against its type's rules + the employee's context.
 * Pure function — no I/O — so it is easy to unit-test and reuse on client & server.
 */
export function validateLeaveRequest(
  rule: LeaveTypeRule,
  input: LeaveRequestInput,
  ctx: ValidationContext,
): ValidationResult {
  const days = calendarDays(input.fromDate, input.toDate);
  const perDay = days ? input.hours / days : input.hours;

  if (input.hours <= 0) {
    return { ok: false, error: "Enter how many hours or days you need." };
  }
  if (rule.incrementHours && input.hours % rule.incrementHours !== 0) {
    return {
      ok: false,
      error: `${rule.name} is booked in ${rule.incrementHours}-hour steps (half or full day).`,
    };
  }
  if (rule.maxDaysPerRequest && days > rule.maxDaysPerRequest) {
    return { ok: false, error: `${rule.name} allows at most ${rule.maxDaysPerRequest} days per request.` };
  }
  if (rule.exactDays && days !== rule.exactDays) {
    return { ok: false, error: `${rule.name} must be taken as exactly ${rule.exactDays} consecutive days.` };
  }
  if (rule.maxHoursPerDay && perDay > rule.maxHoursPerDay) {
    return { ok: false, error: `${rule.name} is capped at ${rule.maxHoursPerDay} hours a day.` };
  }

  const from = startOfDay(input.fromDate).getTime();
  const today = startOfDay(ctx.today).getTime();
  const past = from < today;

  if (rule.requiresAdvance && from <= today) {
    return {
      ok: false,
      error: `${rule.name} must be requested in advance. Log already-worked hours via a retrospective request to your lead.`,
    };
  }
  if (!rule.requiresAdvance && past && !input.retrospective) {
    return {
      ok: false,
      error: "This start date has passed. Mark it as a retrospective (backdated) request to continue.",
    };
  }
  if (rule.requiresProof && !input.hasProof) {
    return {
      ok: false,
      error: `${rule.name} requires proof — attach a document (or mark it an emergency to add later).`,
    };
  }
  if (!rule.unlimited && input.hours > ctx.availableHours) {
    return { ok: false, error: `Only ${ctx.availableHours} hrs of ${rule.name} remaining — reduce your request.` };
  }
  if (ctx.bookedByDate) {
    for (const d of eachIsoDate(input.fromDate, input.toDate)) {
      const already = ctx.bookedByDate[d] ?? 0;
      if (already + perDay > HOURS_PER_DAY + 1e-9) {
        const room = Math.max(0, HOURS_PER_DAY - already);
        return {
          ok: false,
          error: `You already have ${already} hrs booked on ${d}. A day holds ${HOURS_PER_DAY} hrs — add at most ${room} more.`,
        };
      }
    }
  }
  return { ok: true };
}
