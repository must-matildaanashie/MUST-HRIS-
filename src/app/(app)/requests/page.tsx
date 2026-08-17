import { format } from "date-fns";
import { requireEmployee } from "@/lib/session";
import { prisma } from "@/lib/db";
import { StatusBadge } from "@/components/StatusBadge";
import { CancelButton } from "@/components/CancelButton";

export const dynamic = "force-dynamic";

export default async function RequestsPage() {
  const me = await requireEmployee();
  const reqs = await prisma.leaveRequest.findMany({
    where: { employeeId: me.id },
    include: { leaveType: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Requests</h1>
        <p className="text-muted text-sm">Track your leave. Cancel a pending request to release the reserved hours.</p>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-wash text-muted text-left text-[11px] uppercase tracking-wide">
            <tr>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">When</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {reqs.map((r) => (
              <tr key={r.id} className="border-t border-line">
                <td className="px-5 py-3 font-medium">{r.leaveType.name}</td>
                <td className="px-5 py-3 text-muted">
                  {format(r.fromDate, "d MMM")}
                  {r.toDate.getTime() > r.fromDate.getTime() ? `–${format(r.toDate, "d MMM")}` : ""} {format(r.fromDate, "yyyy")}
                </td>
                <td className="px-5 py-3">
                  {r.days} day{r.days === 1 ? "" : "s"} · {r.hours} hrs
                </td>
                <td className="px-5 py-3">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-5 py-3 text-right">{r.status === "PENDING" && <CancelButton id={r.id} />}</td>
              </tr>
            ))}
            {reqs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-muted">
                  No requests yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
