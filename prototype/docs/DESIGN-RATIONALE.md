# MUST HRIS Redesign — Design Rationale & UX Notes
*Prepared for the HRIS team review · Updated Aug 2026 (iteration 2 — hris-helpdesk complaints addressed)*

## 1. Framing: a functional UX enhancement, not a re-skin
The redesign is positioned as a **workflow fix**, not a visual refresh. The current employee experience is fragmented across three tools:

| Today | Problem | In the redesign |
|---|---|---|
| **Slack** — payslips, leave requests, SOP acknowledgements | Ephemeral, unsearchable, easy to miss | One inbox + a searchable record |
| **Hubstaff** — tracked & leave hours | Separate login, hours not visible next to pay | Balances and payslips shown in hours |
| **Notion** — payment calculations | Opaque; employees can't see the math | Transparent `hours × rate = gross` on each payslip |

**Thesis to present:** the redesign consolidates three disconnected sources into one auditable, self-serve system — and every primary CTA now follows a complete, review-gated flow.

---

## 2. Key IA decisions & rationale

### 2.1 Slack messaging (deep-link, don't rebuild)
- **Decision:** "Message on Slack" opens Slack rather than a built-in chat.
- **Why:** Messaging is a solved problem the org already lives in. Rebuilding chat adds maintenance + notification-fatigue with no upside. The HRIS's job is to give **context** (who to contact, on what) and hand off to the existing tool.
- **Where it appears:** My Team cards, and (conceptually) SOP acknowledgement — "the People Team shared this with you, reply here if unclear." This mirrors the **Slack-like experience** the team asked for: message + document viewed together, action taken in place.

### 2.2 "My Team" page vs. Profile's "Team & reporting"
These are intentionally different and should stay distinct:

| | **My Team** (nav page) | **Team & reporting** (inside My Profile) |
|---|---|---|
| Purpose | Org **directory** — contact & coordinate across the dept | **Your** reporting context — who you report to / with |
| Content | Everyone in the dept: role, location, timezone, email, phone, Slack | Your lead + immediate teammates |
| Job to be done | "Who do I contact, and when are they online?" | "Who's my manager / my line?" |

**Recommendation:** keep both, but rename Profile's block to **"My reporting line"** to remove the overlap the team flagged. (Open question for the HRIS team — see §5.)

### 2.3 Compensation consolidation
Strong direction, confirmed. Latest Payslip now surfaces **total hours worked** and a full **calculation breakdown** (`392 hrs × $1.50 = $588.00`), replacing the Notion spreadsheet. This is the clearest single win — but see the validation note in §5.

### 2.4 Leave in hours (Hubstaff-aligned)
- **Decision:** leave is modeled in **hours**, not days. Balances show hours (`56 of 120 hrs`, with a `≈ 15 days` helper for annual). The request form has a **Days / Hours unit toggle** (like kg/lb on a fitness app): pick **Days** for whole days — auto-filled from the date range, so no hour math — or **Hours** for a partial day (e.g. `4` = half day). Submitting **reserves** hours against the balance (see §2.5).
- **Why:** the real process approves and deducts hours (e.g. a 4-hour afternoon off). Showing only "7 of 15 days" misrepresented the actual policy and couldn't express partial-day leave. The unit toggle directly answers the "I had to calculate hours for multiple days" complaint.

### 2.5 Reserved-while-pending balance
- **Decision:** submitting leave does **not** deduct immediately. Hours are **reserved** (held) while the request is pending, **deducted** (moved to Used) on approval, and **released** back to the balance if the request is cancelled, declined or expired.
- **Why:** deducting on submission misrepresented the balance and stranded employees whose requests were later declined. Reserve → approve/deduct → release matches the real approval lifecycle and keeps "Available" honest at every step.

---

## 3. Flows redesigned (the functional core)

| Flow | Before | After |
|---|---|---|
| **Approve a team request** (Lead) | One-click Approve on the card — no review | Card → **open request detail** → Approve → **"Confirm approval"** step → resolves. Decline captures a reason. |
| **SOP acknowledgement** | "Acknowledge" on a generic blurb | HR message + **the actual document**; Acknowledge stays **locked until read to the end**. |
| **Leave request** | Date range only, days-based, no effect | **Days/Hours unit toggle** + rule checks (half/full-day, exact-days, per-day overlap) + live summary → **reserves** the balance → appears in My Requests. |
| **Payslip** | Amount only | Hours + rate + gross **breakdown**. |
| **Notifications** | Bell did nothing / jumped to a page | **Dropdown**; each item **deep-links to the exact** request / document / payslip, marks read; completed approvals update the bell automatically. |
| **Submissions** | Toast only, nothing saved | New requests appear in My Requests; feedback removes the reviewed teammate + advances the counter; profile edits persist. |
| **Reserved balance** | Deducted on submit | **Reserved** while pending → **deducted** on approval → **released** on cancel/decline/expire. |
| **Cancel / declined / expired** | Dead end | Releases the reserved dates + hours; **reapply / corrected-request** path — no dead end. |
| **Past-date request** | Silently allowed / hard "date passed" error | Explains the next action + a **retrospective (backdated)** path for emergencies. |
| **Decision history** (Lead) | Buried at the bottom of Team Requests | Its own tab: **All / Approved / Declined / Expired** filters; reopen a decision for its date, approver & reason. |

---

## 4. Edge cases (documented)

| Edge case | Current handling | Status |
|---|---|---|
| Request **more leave than the balance** | Blocked with a clear message; can't reserve beyond available | ✅ Handled |
| **Sub-increment** leave (e.g. 2h annual) | Blocked — half-day (4h) / full-day (8h) steps only | ✅ Handled |
| **Unlimited** balances (OT, PTO) | Not deductible; shown as ∞ | ✅ Handled |
| Leave **on a public holiday / weekend** | Not detected | ⚠️ To design: skip/deny non-working days |
| **Overlapping** leave requests | Per-day hours validated — same date allowed only if the day's total ≤ 8h | ✅ Handled |
| **Declined / cancelled / expired → reapply** | Reserved balance released; Reapply / corrected-request offered | ✅ Handled |
| **Past-date / retrospective** request | Explained + backdated path (OT stays advance-only) | ✅ Handled |
| **Document needs signing** blocks nothing | Signature updates state + KPIs | ✅ Handled; consider a dashboard nudge |
| **Acknowledge without reading** | Blocked until scrolled to end | ✅ Handled |
| **Approve without reviewing** | Blocked — must open detail + confirm | ✅ Handled |
| **Feedback window expired** | Not enforced | ⚠️ To design: lock after deadline |
| **0-hour / fully-used balance** | Shows 0, bar empty | ✅ Handled; block new requests against it |
| **Role gating** (employee vs. lead) | Team Requests + approvals lead-only | ✅ Handled (switch profiles to see) |

Legend: ✅ handled in prototype · ⚠️ identified, needs design decision.

---

## 5. Validate with users before building further
- **Payslip transparency** — confirm employees *want* the full `hours × rate` breakdown (some may find it noise or raise pay-equity questions). Test before finalizing.
- **My Team vs. reporting line** — validate the naming/split with 3–5 employees; confirm the directory is a real need vs. nice-to-have.
- **Leave in hours** — confirm the 8h/day conversion and that half-day/partial requests match the real Hubstaff rules.
- **Approval confirmation** — check the extra confirm step doesn't slow leads down at volume (consider bulk-approve for low-risk types).

---

## 6. Measurable improvements to claim
- **Fewer tools per task:** payslip + hours + calc in **1** place instead of 3 (Slack/Hubstaff/Notion).
- **No dead CTAs:** every button now completes a real flow (audited — see change log).
- **Auditable actions:** approvals, acknowledgements, and signatures are gated and recorded, not lost in Slack scroll.
- **Accurate leave model:** hours-based, matching the real deduction process.

---

## 7. Iteration 2 — task-level fixes (from the hris-helpdesk complaints)

Each item maps a recurring complaint to the shipped fix.

| # | Complaint | Fix in the prototype |
|---|---|---|
| 1 | Can't take a partial / same-day split; 2h "annual" was accepted | Annual booked in **half-days (4h) / full days (8h)**; sub-increments blocked. **Overlapping hours** validated (same date allowed if the day's total ≤ 8h) rather than blocking the whole date. |
| 2 | Cancelled / declined / expired requests dead-end | These **release** the reserved dates + hours; **Reapply / corrected request** offered. Cancelled + Expired added to My Requests with statuses. |
| 3 | "Start date has passed" with no way forward | Explains the next action + a **retrospective (backdated)** path for emergencies / delayed submissions. OT keeps the advance rule but points to retrospective approval. |
| 4 | Balance unclear | Card shows **Entitlement · Used · Reserved (while pending) · Report a balance issue**. |
| 5 | Leave deducted before approval | **Reserved while pending → deducted on approval → released on cancel/decline/expire.** |
| 6 | Notifications open a generic page | Each notification **deep-links to the exact** request / document / payslip and marks read; completed approvals update the bell automatically. |
| 7 | Leads can't revisit past decisions | Lead gets a dedicated **Decision history** tab — **All / Approved / Declined / Expired** filters; reopen any decision for its **date, approver and reason** (Team Requests stays the pending queue). |

## 8. Later additions

- **Days / Hours unit toggle** on the leave amount field — pick days for multi-day leave (no hour math) or hours for a partial day (kg/lb-style unit switch).
- **"Ask HR" floating assistant** (both prototypes, bottom-right). Suggested questions cover the recurring complaints (balances, partial-day, cancellations, expired, approvals); every answer gives a **direct answer + supporting policy/guide + a relevant action (View balance / Reapply / …) + Message HR-OPS** when unresolved. Unanswered / recurring questions are **logged for HR-Ops** as knowledge-gap signal (surfaced in-flow; the aggregate insight view belongs in an HR-Ops tool, not the employee app — proposed as a concept slide, not shipped in-app).

## 9. Still open (validate / design next)
- Non-working-day detection (holiday/weekend) for leave.
- Feedback-window lock after deadline.
- "My Team" vs "reporting line" naming (see §5).
- Whether the lead's Requests/History split should be **left-nav tabs** (current) or **top segmented tabs** inside Team Requests (thread preference) — a UX call for the HRIS team.

---
*Prototype: https://must-hris.vercel.app — switch profiles (top-right avatar) to see the employee (Sarah) vs. lead (Ethan) experience.*
