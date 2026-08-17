import { redirect } from "next/navigation";
import { currentEmployee } from "@/lib/session";
import { prisma } from "@/lib/db";
import { Role } from "@/domain/enums";
import { DecisionsList, type DecisionItem } from "@/components/DecisionsList";

export const dynamic = "force-dynamic";

export default async function DecisionsPage() {
  const me = await currentEmployee();
  if (!me) redirect("/signin");
  if (me.role !== Role.LEAD && me.role !== Role.HR_OPS) redirect("/dashboard");

  const decisions = await prisma.leaveRequest.findMany({
    where: { status: { in: ["APPROVED", "DECLINED", "EXPIRED"] }, employee: { managerId: me.id } },
    include: { leaveType: true, employee: true },
    orderBy: { decidedAt: "desc" },
  });

  const items: DecisionItem[] = decisions.map((d) => ({
    id: d.id,
    name: d.employee.name,
    type: d.leaveType.name,
    status: d.status,
    decidedAt: d.decidedAt ? d.decidedAt.toISOString() : null,
    reason: d.decisionReason ?? "",
  }));

  return (
    <div className="space-y-6">
      <div>
        <div className="text-brand text-xs font-semibold uppercase tracking-wide">Lead · UI/UX Department</div>
        <h1 className="text-2xl font-bold">Decision history</h1>
        <p className="text-muted text-sm">Every request you&apos;ve actioned — filter and reopen for the date, approver and reason.</p>
      </div>
      <DecisionsList items={items} />
    </div>
  );
}
