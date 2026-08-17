import { requireEmployee } from "@/lib/session";
import { prisma } from "@/lib/db";
import { BalanceCard } from "@/components/BalanceCard";
import { LeaveRequestForm, type LeaveTypeOption } from "@/components/LeaveRequestForm";

export const dynamic = "force-dynamic";

export default async function LeavesPage() {
  const me = await requireEmployee();
  const [balances, types] = await Promise.all([
    prisma.leaveBalance.findMany({ where: { employeeId: me.id }, include: { leaveType: true } }),
    prisma.leaveType.findMany({ orderBy: { name: "asc" } }),
  ]);

  const cards = types.map((t) => {
    const b = balances.find((x) => x.leaveTypeId === t.id);
    return {
      name: t.name,
      color: t.color,
      unlimited: t.unlimited,
      entitlementHours: b?.entitlementHours ?? t.entitlementHours ?? 0,
      usedHours: b?.usedHours ?? 0,
      reservedHours: b?.reservedHours ?? 0,
    };
  });

  const options: LeaveTypeOption[] = types.map((t) => ({
    key: t.key,
    name: t.name,
    unlimited: t.unlimited,
    requiresAdvance: t.requiresAdvance,
    requiresProof: t.requiresProof,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Leaves</h1>
        <p className="text-muted text-sm">Your balances, in hours. Submit a request and it reserves against your balance.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {cards.map((c) => (
            <BalanceCard key={c.name} b={c} />
          ))}
        </div>
        <LeaveRequestForm types={options} />
      </div>
    </div>
  );
}
