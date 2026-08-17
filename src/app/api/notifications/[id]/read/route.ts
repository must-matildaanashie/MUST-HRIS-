import { NextResponse } from "next/server";
import { requireEmployee } from "@/lib/session";
import { prisma } from "@/lib/db";
import { jsonError } from "@/lib/api";

export async function POST(_req: Request, { params }: { params: { id: string } }) {
  try {
    const me = await requireEmployee();
    await prisma.notification.updateMany({
      where: { id: params.id, employeeId: me.id },
      data: { read: true },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return jsonError(e);
  }
}
