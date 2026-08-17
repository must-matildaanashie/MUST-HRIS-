# Mock Data

All data in the prototype is **fabricated demo/seed data** held in-memory in the HTML (arrays/objects in the `<script>` blocks). There is no backend. Values below are the seeds used; edit them in `src/app.html` / `src/app-male.html`.

> **Note:** payslip figures are **placeholder demo values** (net **$588.00**, payroll `20260128`, employee id `128`) — deliberately *not* real payroll data.

---

## Employee — Sarah Miller (`app.html`)

**Profile**
- Sarah Miller · Creative Engineer · Blockchain Dp. · UX/UI Team · MUST SG (Singapore) · based Lahore, PK
- Joined Feb 26, 2025 · Tenure 1y 4m · Mon–Fri · Next increment Feb 26, 2027 · DOB Oct 9, 1998 · Asia/Karachi (GMT+5)
- Email sarah.miller@must.company · Reports to **Maya Ingram** (Team Lead) · Teammates Sophie Grant, Liam Ortega
- Emergency: James Miller (immediate family)
- Bank (masked + Locked): United Bank Ltd (UBL) · IBAN ••••7503 · Salaried

**Leave balances (in hours)** — `entitlement / used` → shown as `available hrs left`
| Type | Available | Entitlement | Notes |
|---|---|---|---|
| Annual Leave | 56 | 120 | ≈ 15 days |
| Bonus Vacation (BVL) | 0 | 32 | exactly 4 days/request |
| Family Leave | 40 | 40 | proof required |
| Maternity Leave | 360 | 360 | |
| Overtime (OT) | ∞ | — | max 2 hrs/day, in advance |
| Paid Time Off (PTO) | ∞ | — | |
| Public Holiday | 16 | 120 | |
| Tenure Leave | 16 | 40 | |
| Unpaid Time Off (UTO) | 0 | 96 | |
| Vacation Leave (VL) | 0 | 24 | exactly 3 days |

**My Requests (seeded)** — type · date · status
- Time off · 12–14 Aug · **Pending** · Overtime 4h (Jun) · **Approved** · Equipment (monitor) · **Approved** · Query (payslip) · **Resolved** · WFH 2 days · **Approved** · Query (Figma) · **Resolved** · Time off · 3 Jul · **Pending** · Overtime 6h (May) · **Declined** · Annual Leave 2 days · **Cancelled** (dates/hours released) · Overtime 2h (Apr) · **Expired** (released)

**Payslips / payments** — June 2026 **$588.00** (Salary), June reimbursement $42, May $560 (Salary), May intermediary fee $75, Apr subscription $12; history down to Mar 2025.

**Notifications** — Casual Leave approved (Maya Ingram) · Employment Contract needs signature · June payslip ready ($588) · Monthly feedback due · Upcoming holiday (Independence Day, 14 Aug). Plus live ones pushed on approve/decline.

**Documents** — Employee NDA, Employee Handbook, Bank Information, Academic Records, Starter Guide (all **Signed**) · Employment Contract 2026 (**Needs sign**).

**Holidays** — Local (Lahore, PK 2026): New Year, Kashmir Day, Pakistan Day, Eid ul-Fitr, Labour Day, Eid ul-Adha, Ashura, Independence Day, Eid Milad, Iqbal Day, Quaid-e-Azam Day. Team holidays grouped by country (SG, PK, KR, PH, UK) with member avatars.

---

## Team (directory) — used on My Team, Who's out, Reporting, Feedbacks
| Initials | Name | Role | Location · TZ |
|---|---|---|---|
| MI | Maya Ingram | Team Lead · Product Designer | Lahore, PK · GMT+5 |
| SG | Sophie Grant | Product Designer | Singapore · GMT+8 |
| LO | Liam Ortega | UX Engineer | Manila, PH · GMT+8 |
| FH | Felix Harper | Visual Designer | London, UK · GMT+0 |
| AK | Aisha Khan | UI/UX Intern | Lahore, PK · GMT+5 |
| AM | Adam Mercer | Video Editor | Lahore, PK · GMT+5 |

(Photos pulled from randomuser.me at runtime; fall back to coloured initials offline.)

---

## Team-lead — Ethan Miller (`app-male.html`)

Same base as the employee app, **plus**:

**Team Requests — pending queue (`TRDETAIL`)**
- Sophie Grant · **Annual Leave** · 12–14 Aug · 3 days · "Family trip, back Monday."
- Felix Harper · **Overtime** · 2 hrs · 14 Aug · "Client delivery push."
- Aisha Khan · **Asset / Equipment** · Wacom Intuos M ($89) · "For UI mockups."
- Liam Ortega · **Sick Leave** · 11 Aug · 1 day · "Doctor's appointment." (attachment: medical-note.pdf)

Each request: full detail (dates, hours, balance-after, approval path) + reason + optional attachment. Approve/Decline captures a reason and records the decision. KPIs: 4 awaiting · 12 approved this month · 1 declined.

**Decision history (`HIST` seeds)** — reopenable, with date/approver/reason
- Sophie Grant · Annual Leave · **Approved** (8 Jul)
- Aisha Khan · Asset/Equipment · **Approved** (6 Jul)
- Liam Ortega · Sick Leave · **Approved** (2 Jul)
- Felix Harper · Overtime · **Declined** — over 2h/day cap (21 Jun)
- Adam Mercer · Overtime · **Expired** — not actioned in the window (19 Jun)

New decisions from the queue are prepended live.

---

## Ask HR — Q&A dataset (`QA`, both files)
Five suggested questions, each with a direct answer + policy + action + Message HR-OPS:
1. **Understanding my leave balance** → Leave & Time-off Policy · action *View balance*
2. **Can I take a partial (half) day?** → · action *Request leave*
3. **How do I cancel a request?** → · action *View my requests*
4. **My request expired — what now?** → · action *View my requests*
5. **How do approvals work?** → *Process & approvals* · action *View my requests* (employee) / *Team Requests* (lead)

Recurring-question counters and unanswered/custom questions are stored in-memory (`LOG`) as an HR-Ops knowledge-gap signal.
