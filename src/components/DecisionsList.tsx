"use client";

import { useState } from "react";
import { StatusBadge } from "./StatusBadge";

export interface DecisionItem {
  id: string;
  name: string;
  type: string;
  status: string;
  decidedAt: string | null;
  reason: string;
}

const FILTERS = ["ALL", "APPROVED", "DECLINED", "EXPIRED"] as const;

export function DecisionsList({ items }: { items: DecisionItem[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("ALL");
  const shown = filter === "ALL" ? items : items.filter((i) => i.status === filter);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={
              "rounded-full px-4 py-1.5 text-sm font-medium border " +
              (filter === f ? "bg-brand text-white border-brand" : "bg-white text-muted border-line")
            }
          >
            {f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {shown.length === 0 && <p className="text-sm text-muted">No decisions yet.</p>}
        {shown.map((d) => (
          <div key={d.id} className="card p-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="font-semibold text-sm">
                {d.name} <span className="text-muted font-normal">· {d.type}</span>
              </div>
              <div className="text-xs text-muted mt-0.5">
                {d.decidedAt ? new Date(d.decidedAt).toLocaleDateString() : "—"}
                {d.reason ? ` · ${d.reason}` : ""}
              </div>
            </div>
            <StatusBadge status={d.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
