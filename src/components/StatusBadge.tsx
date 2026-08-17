const MAP: Record<string, string> = {
  PENDING: "bg-amber/10 text-amber",
  APPROVED: "bg-brand-soft text-brand-dark",
  DECLINED: "bg-red-50 text-red-600",
  CANCELLED: "bg-gray-100 text-gray-500",
  EXPIRED: "bg-orange-50 text-orange-600",
};

export function StatusBadge({ status }: { status: string }) {
  const cls = MAP[status] ?? "bg-gray-100 text-gray-500";
  const label = status.charAt(0) + status.slice(1).toLowerCase();
  return <span className={"badge " + cls}>{label}</span>;
}
