import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Role } from "@/domain/enums";

export async function currentEmployee() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.employeeId;
  if (!id) return null;
  return prisma.employee.findUnique({ where: { id } });
}

export async function requireEmployee() {
  const e = await currentEmployee();
  if (!e) throw new Error("Unauthorized");
  return e;
}

export async function requireLead() {
  const e = await requireEmployee();
  if (e.role !== Role.LEAD && e.role !== Role.HR_OPS) {
    throw new Error("Forbidden");
  }
  return e;
}
