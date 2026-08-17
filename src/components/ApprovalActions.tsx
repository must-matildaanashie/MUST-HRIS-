"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ApprovalActions({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function decide(decision: "APPROVED" | "DECLINED") {
    let reason: string | undefined;
    if (decision === "DECLINED") {
      const r = window.prompt("Reason for declining?") ?? "";
      reason = r;
    }
    setBusy(decision);
    const res = await fetch(`/api/approvals/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision, reason }),
    });
    setBusy(null);
    if (res.ok) router.refresh();
    else {
      const d = await res.json().catch(() => ({}));
      alert(d.error ?? "Could not action the request.");
    }
  }

  return (
    <div className="flex gap-2">
      <button className="btn-ghost text-xs" onClick={() => decide("DECLINED")} disabled={busy !== null}>
        Decline
      </button>
      <button className="btn-primary text-xs" onClick={() => decide("APPROVED")} disabled={busy !== null}>
        {busy === "APPROVED" ? "…" : "Approve"}
      </button>
    </div>
  );
}
