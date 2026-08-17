import { format } from "date-fns";
import { redirect } from "next/navigation";
import { currentEmployee } from "@/lib/session";
import { prisma } from "@/lib/db";
import { Role } from "@/domain/enums";
import { ApprovalActions } from "@/components/ApprovalActions";

export const dynamic = "force-dynamic";

export default async function TeamRequestsPage() {
  const me = await currentEmployee();
  if (!me) redirect("/signin");
  if (me.role !== Role.LEAD && me.role !== Role.HR_OPS) redirect("/dashboard");

  const pending = await prisma.leaveRequest.findMany({
    where: { status: "PENDING", employee: { managerId: me.id } },
    include: { leaveType: true, employee: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <div className="text-brand text-xs font-semibold uppercase tracking-wide">Lead · UI/UX Department</div>
        <h1 className="text-2xl font-bold">Team Requests</h1>
        <p className="text-muted text-sm">Approvals awaiting your review from your team.</p>
      </div>

      <div className="space-y-3">
        {pending.length === 0 && <p className="text-sm text-muted">All caught up — nothing awaiting your approval.</p>}
        {pending.map((r) => (
          <div key={r.id} className="card p-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="font-semibold">
                {r.employee.name} <span className="text-muted font-normal">· {r.leaveType.name}</span>
              </div>
              <div className="text-xs text-muted mt-0.5">
                {format(r.fromDate, "d MMM")}
                {r.toDate.getTime() > r.fromDate.getTime() ? `–${format(r.toDate, "d MMM")}` : ""} · {r.days} day
                {r.days === 1 ? "" : "s"} · {r.hours} hrs
              </div>
              {r.reason && <div className="text-xs text-muted mt-1 italic">&ldquo;{r.reason}&rdquo;</div>}
            </div>
            <ApprovalActions id={r.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
