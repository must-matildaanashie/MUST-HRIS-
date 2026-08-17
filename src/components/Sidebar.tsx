"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, LEAD_NAV } from "@/lib/nav";

export function Sidebar({ isLead, name, title }: { isLead: boolean; name: string; title?: string | null }) {
  const path = usePathname();
  const items = [...NAV, ...(isLead ? LEAD_NAV : [])];

  return (
    <aside className="w-60 shrink-0 bg-sidebar text-white/60 flex flex-col p-4 min-h-screen">
      <div className="flex items-center gap-2 px-2 py-3 font-bold text-white">
        <span className="flex gap-1">
          <i className="w-[7px] h-6 rounded-sm bg-white" />
          <i className="w-[7px] h-6 rounded-sm bg-white" />
          <i className="w-[7px] h-6 rounded-sm bg-brand" />
        </span>
        <span className="text-[13px] leading-tight">
          MUST
          <br />
          COMPANY
        </span>
      </div>

      <nav className="mt-4 space-y-1">
        {items.map((i) => {
          const active = path === i.href || path.startsWith(i.href + "/");
          return (
            <Link
              key={i.href}
              href={i.href}
              className={
                "block rounded-lg px-3 py-2 text-sm transition " +
                (active ? "bg-brand text-white font-semibold" : "hover:text-white")
              }
            >
              {i.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-2 pt-4 border-t border-white/10">
        <div className="text-white text-[13px] font-semibold">{name}</div>
        <div className="text-[11px]">{title ?? (isLead ? "Team Lead" : "Employee")}</div>
      </div>
    </aside>
  );
}
