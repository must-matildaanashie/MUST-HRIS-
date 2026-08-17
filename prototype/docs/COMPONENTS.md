# Components & Structure

The prototype has **no separate component files** — it's single-file HTML per persona. This document maps the reusable UI pieces and the JavaScript modules so the HRIS team can find and reuse them.

## App shell (every screen)
- **Sidebar** (`#nav`) — dark, collapsible; logo, nav items (`a[data-s="..."]`), profile block. Nav routing via `go(page)`.
- **Top bar** — breadcrumb, search, **notifications bell + dropdown** (`#notifBell` / `#notifPanel`), **+ Request** button, avatar/profile switcher.
- **Modals** — a generic modal system: `openModal(title, bodyHTML, footerHTML, backFn)` / `closeModal()` (`#overlay2`). Used by every flow (leave form, payslip, signature, request detail, confirmations, Ask-HR "Report a balance issue", etc.).
- **Toasts** — `toast(msg)` (`#toasts`).
- **Responsive** — hamburger + off-canvas nav drawer + horizontal table scroll at ≤ 900px.

## Screens (employee — `app.html`)
| id | Screen | Key components |
|---|---|---|
| `s-dashboard` | Dashboard | Welcome banner + CTAs, 3 stat cards, Latest Activity, **Next Public Holiday** card, Annual-leave gauge, "Who's out" day-selector, Announcements & Reminders, Recent payments / Documents / Upcoming |
| `s-profile` | My Profile | Hero (avatar + chips + Edit), quick-stat strip, Personal & contact, Team & reporting, Emergency contact, **masked + Locked** bank details |
| `s-salary` | My Salary | 3 stat cards, Latest payslip **breakdown**, Payment history (typed), searchable Payslips list; **payslip opens as a real PDF** |
| `s-documents` | My Documents | KPI strip (Total/Signed/Needs sign), document **card grid**, **in-app e-signature** flow, PDF viewer |
| `s-sops` | SOPs & Policies | Policy library list, **read-gated acknowledge** |
| `s-team` | My Team | Member **directory cards** with full contact + **Message on Slack** deep-link |
| `s-feedbacks` | My Feedbacks | Monthly progress card, People-to-review list, anonymous feedback form |
| `s-leaves` | My Leaves | **10 leave-balance cards** (hours; ∞ for OT/PTO), balance breakdown + **Report a balance issue**, public + team holidays (by country), leave-requests table |
| `s-requests` | My Requests | Status **filter chips** (All / Pending / Approved / Resolved / Declined / **Cancelled** / **Expired**), requests table, detail/edit + **Cancel / Reapply** |

## Lead-only screens (`app-male.html`)
| id | Screen | Key components |
|---|---|---|
| `s-teamreq` | Team Requests | KPI row, type filters, **approval cards** → open detail → **Approve / Decline (with reason) → Confirm** step; sign-in "requests to approve" popup |
| `s-decisions` | **Decision history** | Own left-nav tab; **All / Approved / Declined / Expired** filters; reopen a decision for its **date, approver & reason** |

## Shared JavaScript modules (bottom of each file)
- **Navigation** — `go(page)`, breadcrumb + active state, hash sync, simulated load bar.
- **Leave-rules engine** — `RULES` config per leave type, `window.lvOpenForm(type)`, live validation, `#lvSubmit` handler. Includes the **Days / Hours unit toggle**, half/full-day increment rule, per-date **overlap** check, and the **retrospective (past-date)** path.
- **Reserved-balance ledger** — `window.LB` (per-type entitlement/used/reserved), `window.lvDeduct` (reserve), `window.lvRelease`, `window.lvApprove`; balance cards re-render from this. Requests registry `LVREG` links each request row to its reservation.
- **Requests** — `REQUESTS` array + `window.addRequest`, `renderReqs`, detail/edit modal, **Cancel / Reapply**, approve/decline **preview** (moves reserved → used or returns it).
- **Notifications** — dropdown routing that **deep-links to the exact** request/document/payslip and marks read; `pushNotif()` adds live approval/decline notifications and updates the bell.
- **Payslip / Documents PDF** — `jsPDF` builds a company-template payslip & sample documents; `PDF.js` renders them to a canvas. In-app **e-signature** pad.
- **Ask HR assistant** — floating CTA + panel; `QA` dataset, answer cards (answer + policy + action + Message HR-OPS), in-memory logging of unanswered questions. Role-aware (lead vs employee).
- **Team Requests + Decision history** (`app-male.html`) — `TRDETAIL` data, approve/decline/confirm, `HIST` decision-history store, KPI + notif updates.

## Design tokens (CSS variables, top of each file)
Green `--green #018038`, dark `--green-dark`, soft `--green-soft`; `--ink`, `--muted`, `--line`, `--wash`, `--card`; status badges `b-ok / b-wait / b-dec / b-res / b-cancel / b-exp`. Font: system/Inter-style sans.
