export interface NavItem {
  href: string;
  label: string;
}

export const NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/leaves", label: "My Leaves" },
  { href: "/requests", label: "My Requests" },
];

export const LEAD_NAV: NavItem[] = [
  { href: "/team-requests", label: "Team Requests" },
  { href: "/decisions", label: "Decision history" },
];
