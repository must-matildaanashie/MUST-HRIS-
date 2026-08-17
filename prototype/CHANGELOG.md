# Changelog — Iteration 2 (hris-helpdesk fixes + Ask HR)

Applied to **both** personas (`app.html`, `app-male.html`) and deployed to https://must-hris.vercel.app.

## Leave request form
- Amount field now has a **Days / Hours unit toggle** (Days auto-fills from the date range → no hour math; Hours for partial days).
- **Half-day (4h) / full-day (8h)** rule — a 2-hour Annual request is blocked (4-hour steps).
- **Overlapping hours** validated per day (same date allowed if the day's total ≤ 8h) instead of blocking the date.
- **Past dates**: explained + **retrospective (backdated)** path; Overtime stays advance-only.

## Leave balances (reserved model)
- **Reserved-while-pending**: submit reserves; **approve → deducted**; **decline/cancel/expire → returned**.
- Card breakdown shows **Entitlement · Used · Reserved (only when pending)** + **Report a balance issue**.

## My Requests
- **Cancel** releases dates + hours; **Cancelled** and **Expired** statuses + filters added.
- Declined/cancelled/expired auto-release + **Reapply / corrected-request** path.
- Approve/decline **preview** on a pending request (moves reserved → used, or returns it).

## Notifications
- Each notification **deep-links to the exact** request/document/payslip and marks read.
- Completed approvals **push a live notification** and update the bell.

## Team-lead
- Approval history with **All / Approved / Declined / Expired** filters + date/approver/reason.
- **Decision history moved to its own left-nav tab** (Team Requests = pending queue only).

## Ask HR assistant (new)
- Floating CTA on both personas; suggested questions for the recurring complaints.
- Each answer: **direct answer + policy + action + Message HR-OPS**; role-aware for leads.
- Unanswered questions logged in-memory as HR-Ops knowledge-gap signal. (Employee-facing "Trends" view was removed as out of place.)

See `docs/DESIGN-RATIONALE.md` for the reasoning behind each change.
