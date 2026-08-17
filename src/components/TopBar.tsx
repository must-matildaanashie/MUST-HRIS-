"use client";

import { signOut } from "next-auth/react";

export function TopBar({ name }: { name: string }) {
  return (
    <header className="h-16 border-b border-line bg-white flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="text-sm text-muted">Pages</div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">{name}</span>
        <button className="btn-ghost text-xs" onClick={() => signOut({ callbackUrl: "/signin" })}>
          Sign out
        </button>
      </div>
    </header>
  );
}
