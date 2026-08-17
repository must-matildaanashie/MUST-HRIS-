import { NextResponse } from "next/server";
import { requireEmployee } from "@/lib/session";
import { prisma } from "@/lib/db";
import { cancelLeaveRequest } from "@/domain/requests";
import { ForbiddenError } from "@/domain/errors";
import { jsonError } from "@/lib/api";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  try {
    const me = await requireEmployee();
    const req = await prisma.leaveRequest.findUnique({ where: { id: params.id } });
    if (!req) return NextResponse.json({ error: "Not found." }, { status: 404 });
    if (req.employeeId !== me.id) throw new ForbiddenError("You can only cancel your own requests.");
    const updated = await cancelLeaveRequest(params.id, me.id);
    return NextResponse.json(updated);
  } catch (e) {
    return jsonError(e);
  }
}
