import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireEmployee } from "@/lib/session";
import { createLeaveRequest } from "@/domain/requests";
import { jsonError } from "@/lib/api";

const schema = z.object({
  leaveTypeKey: z.string().min(1),
  fromDate: z.string(),
  toDate: z.string(),
  hours: z.number().positive(),
  reason: z.string().optional(),
  retrospective: z.boolean().optional(),
  hasProof: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const me = await requireEmployee();
    const body = schema.parse(await req.json());
    const created = await createLeaveRequest({
      employeeId: me.id,
      leaveTypeKey: body.leaveTypeKey,
      fromDate: new Date(body.fromDate),
      toDate: new Date(body.toDate),
      hours: body.hours,
      reason: body.reason,
      retrospective: body.retrospective,
      hasProof: body.hasProof,
    });
    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    return jsonError(e);
  }
}
