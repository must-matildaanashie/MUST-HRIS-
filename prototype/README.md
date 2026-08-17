# MUST HRIS — Interactive Prototype

A functional, click-through redesign of the MUST Company HRIS, covering both the **employee** and **team-lead** experiences, including the **Ask HRIS** in-product assistant.

- **Live preview:** https://must-hris.vercel.app
- **Stack:** plain **HTML + CSS + JavaScript**. No framework, no build step, no package install. Each screen is a single self-contained file.
- **Two personas** (switch via the avatar in the top-right):
  - `app.html` — **Sarah Miller**, a regular **employee**
  - `app-male.html` — **Ethan Miller**, a **team lead** (extra: Team Requests, Decision history, approval popup)

> This is a **prototype**, not a production system. All data is mock/seed data held in-memory in the page (see `docs/MOCK-DATA.md`). There is no backend, database, or auth — "Sign in with Google" is a visual step that routes to the dashboard.

---

## 1. Files

```
src/
├── index.html       # Sign-in screen (Google SSO look) — entry point; uses world-map.svg
├── app.html         # Employee app (Sarah) — all screens, modals, Ask HR, in one file
├── app-male.html    # Team-lead app (Ethan) — same base + lead-only features
├── world-map.svg    # Decorative world map used on the sign-in hero
└── vercel.json      # Cache-Control: no-store headers (so profile switches never serve stale)
docs/
├── DESIGN-RATIONALE.md  # Why each change was made (for the HRIS team review)
├── COMPONENTS.md        # The components/sections in each screen + shared JS modules
└── MOCK-DATA.md         # The seed data used for the employee and team-lead experiences
CHANGELOG.md         # What changed in iteration 2 (the hris-helpdesk fixes + Ask HR)
```

**Why two files instead of a shared component?** The prototype intentionally keeps the employee and lead builds as two files so role-based differences (Team Requests, Decision history, badges, the approval popup) can be shown by simply switching profiles. Shared features are kept in sync between the two; lead-only features live in `app-male.html`.

---

## 2. Run it locally

No install required. Two options:

**A. Quick — open the file**
```bash
open src/index.html      # macOS
```
Then click through Sign in → the app.

**B. Recommended — static server** (so relative assets like `world-map.svg` load reliably):
```bash
cd src
python3 -m http.server 4137
# open http://localhost:4137/index.html
```

Or with Node:
```bash
npx serve src
```

Navigate: `index.html` (sign in) → `app.html` (employee). To see the **team-lead** experience, open `app-male.html` directly, or use the avatar/profile switcher in the top bar.

**Runtime dependencies (loaded from CDN — nothing to install):**
- **jsPDF 2.5.1** — generates the real PDF payslip & sample documents
- **PDF.js 3.11.174** — renders those PDFs to a canvas in the viewer
- **randomuser.me** — sample avatar photos

If you run fully offline, the app still works — PDFs fall back gracefully and avatars show initials.

---

## 3. Deploy (Vercel)

Currently deployed to Vercel via the **CLI**, to **production**, from the `src/` contents:

```bash
cd src
vercel deploy --prod --yes
# On some networks Node's IPv6 lookup fails with "TypeError: fetch failed" —
# prefix with the IPv4 flag if so:
NODE_OPTIONS=--dns-result-order=ipv4first vercel deploy --prod --yes
```

- **Vercel project:** `must-hris`  · **Production URL:** https://must-hris.vercel.app
- **Branch/deployed state:** deploys are **CLI-based**, not wired to a git branch. This repository's **`main`** branch **is** the currently-deployed production build — i.e. what you get here is exactly what's live. If you connect it to a Git integration, point Vercel's production branch at `main`.
- `vercel.json` sends `Cache-Control: no-store` on all routes so switching personas always fetches the latest.

> Not included in this package: `.env.local` (holds a Vercel CLI token) and `.vercel/` (project link) — both are machine-specific and secret. Deploying from a fresh checkout will prompt you to link/authenticate your own Vercel project.

---

## 4. Ask HRIS ("Ask HR" assistant)

Built into **both** `app.html` and `app-male.html` as a floating CTA (bottom-right). Implementation is a self-contained `<script>`/`<style>` block near the end of each file (search for `askhr`).

- Suggested questions drawn from the recurring hris-helpdesk complaints (balances, partial-day, cancellations, expired requests, approvals).
- Each answer returns: a **direct answer**, the **supporting policy/guide**, a **relevant action** (e.g. View balance / Reapply / Team Requests), and a **Message HR-OPS** escalation.
- The approvals answer **adapts by role** (lead → Team Requests + Decision history).
- Unanswered / custom questions are logged in-memory for HR-Ops as a knowledge-gap signal (surfaced in-flow).

See `docs/COMPONENTS.md` (§ Ask HR) and `docs/MOCK-DATA.md` (§ Ask HR Q&A) for details.

---

## 5. Where to look in the code

Everything for a persona lives in one HTML file. Inside each file:
- Top: `<style>` (all CSS) then the page markup (`<section class="page" id="s-...">` per screen).
- Bottom: a series of `<script>` blocks — navigation (`go()`), the leave-rules engine, the reserved-balance ledger, requests, notifications, Ask HR, and (in `app-male.html`) Team Requests + Decision history.

See `docs/COMPONENTS.md` for a screen-by-screen map and `CHANGELOG.md` for what changed most recently.
