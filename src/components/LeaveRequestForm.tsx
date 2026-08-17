"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export interface LeaveTypeOption {
  key: string;
  name: string;
  unlimited: boolean;
  requiresAdvance: boolean;
  requiresProof: boolean;
}

const TODAY = "2026-07-23"; // demo "today" — matches the seed data window

export function LeaveRequestForm({ types }: { types: LeaveTypeOption[] }) {
  const router = useRouter();
  const [typeKey, setTypeKey] = useState(types[0]?.key ?? "");
  const [unit, setUnit] = useState<"days" | "hours">("days");
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("2026-08-20");
  const [to, setTo] = useState("2026-08-20");
  const [retro, setRetro] = useState(false);
  const [proof, setProof] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [busy, setBusy] = useState(false);

  const type = useMemo(() => types.find((t) => t.key === typeKey), [types, typeKey]);
  const hours = unit === "days" ? amount * 8 : amount;
  const days = unit === "days" ? amount : Math.round((amount / 8) * 100) / 100;
  const isPast = from < TODAY;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setOk(false);
    const res = await fetch("/api/leave-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leaveTypeKey: typeKey, fromDate: from, toDate: to, hours, retrospective: retro, hasProof: proof }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Something went wrong.");
      return;
    }
    setOk(true);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="card p-5 space-y-4">
      <h3 className="font-semibold">Request leave</h3>

      <div>
        <label className="label">Leave type</label>
        <select className="input" value={typeKey} onChange={(e) => setTypeKey(e.target.value)}>
          {types.map((t) => (
            <option key={t.key} value={t.key}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">From</label>
          <input type="date" className="input" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div>
          <label className="label">To</label>
          <input type="date" className="input" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
      </div>

      <div>
        <label className="label">Amount — choose days or hours</label>
        <div className="inline-flex rounded-lg border border-line p-1 mb-2 bg-wash">
          {(["days", "hours"] as const).map((u) => (
            <button
              type="button"
              key={u}
              onClick={() => {
                // keep the same total when switching units
                setAmount(u === "days" ? Math.round((hours / 8) * 100) / 100 : hours);
                setUnit(u);
              }}
              className={"px-4 py-1.5 rounded-md text-sm font-semibold " + (unit === u ? "bg-white text-brand shadow-sm" : "text-muted")}
            >
              {u === "days" ? "Days" : "Hours"}
            </button>
          ))}
        </div>
        <input
          type="number"
          min={unit === "days" ? 0.5 : 1}
          step={unit === "days" ? 0.5 : 1}
          className="input"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
        />
        <p className="text-xs text-muted mt-1">
          Requesting <b>{days} day{days === 1 ? "" : "s"} · {hours} hrs</b> · 1 day = 8 working hours
        </p>
      </div>

      {isPast && !type?.requiresAdvance && (
        <label className="flex gap-2 items-start text-sm text-ink bg-amber/5 border border-amber/30 rounded-lg p-3">
          <input type="checkbox" checked={retro} onChange={(e) => setRetro(e.target.checked)} className="mt-1" />
          <span>This start date has passed — submit as a <b>retrospective (backdated)</b> request.</span>
        </label>
      )}

      {type?.requiresProof && (
        <label className="flex gap-2 items-center text-sm">
          <input type="checkbox" checked={proof} onChange={(e) => setProof(e.target.checked)} />
          Proof attached (required for {type.name})
        </label>
      )}

      {error && <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3">{error}</div>}
      {ok && <div className="text-sm text-brand-dark bg-brand-soft rounded-lg p-3">Request submitted — hours reserved. ✓</div>}

      <button className="btn-primary w-full" disabled={busy}>
        {busy ? "Submitting…" : "Submit request"}
      </button>
    </form>
  );
}
