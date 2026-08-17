import { requireEmployee } from "@/lib/session";
import { prisma } from "@/lib/db";
import { availableHours } from "@/domain/balances";

export default async function DashboardPage() {
  const me = await requireEmployee();
  const [balances, pendingCount, payslip] = await Promise.all([
    prisma.leaveBalance.findMany({ where: { employeeId: me.id }, include: { leaveType: true } }),
    prisma.leaveRequest.count({ where: { employeeId: me.id, status: "PENDING" } }),
    prisma.payslip.findFirst({ where: { employeeId: me.id }, orderBy: { paidAt: "desc" } }),
  ]);

  const annual = balances.find((b) => b.leaveType.key === "annual");
  const annualAvail = annual ? availableHours(annual) : 0;

  const stats = [
    { label: "Latest payslip", value: payslip ? `$${payslip.netAmount.toFixed(2)}` : "—", sub: payslip?.period ?? "" },
    { label: "Annual leave", value: `${annualAvail} hrs`, sub: annual ? `of ${annual.entitlementHours} hrs` : "" },
    { label: "Pending requests", value: String(pendingCount), sub: "awaiting approval" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Good day, {me.name.split(" ")[0]} 👋</h1>
        <p className="text-muted text-sm">Here&apos;s what&apos;s happening at MUST today.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="label">{s.label}</div>
            <div className="text-2xl font-bold text-ink">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
