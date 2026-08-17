import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireLead } from "@/lib/session";
import { prisma } from "@/lib/db";
import { decideLeaveRequest } from "@/domain/requests";
import { ForbiddenError } from "@/domain/errors";
import { LeaveStatus } from "@/domain/enums";
import { jsonError } from "@/lib/api";

const schema = z.object({
  decision: z.enum([LeaveStatus.APPROVED, LeaveStatus.DECLINED]),
  reason: z.string().optional(),
});

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const lead = await requireLead();
    const body = schema.parse(await req.json());

    const request = await prisma.leaveRequest.findUnique({
      where: { id: params.id },
      include: { employee: true },
    });
    if (!request) return NextResponse.json({ error: "Not found." }, { status: 404 });
    // A lead may only action their own reports' requests.
    if (request.employee.managerId !== lead.id) {
      throw new ForbiddenError("You can only action requests from your team.");
    }

    const updated = await decideLeaveRequest(params.id, body.decision, lead.id, body.reason);
    return NextResponse.json(updated);
  } catch (e) {
    return jsonError(e);
  }
}
