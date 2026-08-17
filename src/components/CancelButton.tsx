"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CancelButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function cancel() {
    setBusy(true);
    const res = await fetch(`/api/leave-requests/${id}/cancel`, { method: "POST" });
    setBusy(false);
    if (res.ok) router.refresh();
    else {
      const d = await res.json().catch(() => ({}));
      alert(d.error ?? "Could not cancel.");
    }
  }

  return (
    <button onClick={cancel} disabled={busy} className="text-xs font-semibold text-red-600 hover:underline">
      {busy ? "…" : "Cancel"}
    </button>
  );
}
