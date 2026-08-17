import { availableHours } from "@/domain/balances";

export interface BalanceCardData {
  name: string;
  color?: string | null;
  unlimited: boolean;
  entitlementHours: number;
  usedHours: number;
  reservedHours: number;
}

export function BalanceCard({ b }: { b: BalanceCardData }) {
  const avail = b.unlimited ? Infinity : availableHours(b);
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded" style={{ background: b.color ?? "#018038" }} />
        <span className="font-semibold text-sm">{b.name}</span>
      </div>
      <div className="mt-2 text-2xl font-bold">
        {b.unlimited ? "∞" : avail}{" "}
        <span className="text-sm font-normal text-muted">{b.unlimited ? "unlimited" : "hrs left"}</span>
      </div>
      {!b.unlimited && <div className="text-xs text-muted">of {b.entitlementHours} hrs</div>}
      <div className="mt-3 pt-3 border-t border-dashed border-line space-y-1 text-[11px] text-muted">
        {!b.unlimited && (
          <>
            <Row k="Entitlement" v={`${b.entitlementHours} hrs`} />
            <Row k="Used" v={`${b.usedHours} hrs`} />
          </>
        )}
        {b.reservedHours > 0 && <Row k="Reserved · pending" v={`${b.reservedHours} hrs`} amber />}
      </div>
    </div>
  );
}

function Row({ k, v, amber }: { k: string; v: string; amber?: boolean }) {
  return (
    <div className="flex justify-between">
      <span>{k}</span>
      <b className={amber ? "text-amber" : "text-ink"}>{v}</b>
    </div>
  );
}
