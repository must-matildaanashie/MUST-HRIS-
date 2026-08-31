# Proposed prototypes — Rohma

These are **standalone proposals**, not replacements. Nothing in `prototype/src/`
or `admin-prototype/` is touched, so this branch merges cleanly and you can take
whatever you like, feature by feature, or nothing at all.

Open the files directly in a browser (no build step), or view them live:

| File | Persona | Live |
|---|---|---|
| `app-admin.html` | Morgan Avery — Super Admin | https://must-hris.vercel.app/app-admin.html |
| `app-male.html` | Ethan Miller — Team Lead | https://must-hris.vercel.app/app-male.html |
| `app.html` | Sarah Miller — Employee | https://must-hris.vercel.app/app.html |

---

## Where this overlaps with your recent work

We solved some of the same problems independently, so please treat these as options
to compare against yours rather than as corrections:

| Area | Yours | This proposal |
|---|---|---|
| Sidebar | Collapsible grouped sections (`bc07b4d`) | Flat 4–9 items, each page carries its own **horizontal tabs** |
| Dashboard | Consistent My Space dashboard (`22fa0d6`) | **My Space / MUST Space** toggle on one landing page |

Both are reasonable. Worth a conversation before either becomes the standard.

**`app-admin.html` is entirely new** — there's no super-admin HTML prototype in the
repo today, so that one doesn't compete with anything.

---

## Reasoning behind the two overlapping choices

**Horizontal sub-nav instead of dropdowns.** The admin sidebar had 19 destinations in
4 dropdown groups. Dropdowns hide where things live, so you have to recall the group
before you can reach the page, and related work gets split up (Leave Management,
Balances and All Requests were three sidebar entries for one task). Flattening to 9
and moving each page's views into tabs means every door is visible, and you can move
sideways between related views without going back to the sidebar.

**Dashboard toggle.** A dashboard only works if it's the first thing you land on. If
reminders sit behind a nav click, people don't go looking, so the toggle keeps both
personal and company views one click apart on the landing page.

---

## Feature map

Every feature was built as a self-contained `<style id="…">` and/or `<script>` block
near the end of the file, so a single feature can be lifted without taking the rest.
Search for the marker.

### Shared across all three panels

| Feature | Marker |
|---|---|
| Horizontal sub-nav (tabs per page) | `data-subnav="…"`, `<style id="empsubnav">` |
| Group-aware routing + breadcrumb (`My Info › Leaves`) | `var GRP={…}` inside `go()` |
| **Needs your attention** (things to act on) | `.focal-card`, `.na-item` |
| **Announcements & Reminders** (things to read) | `.ann-card` |
| Leave carousel — the `›` arrow cycles every leave type | `#lbNext` / `#dsLvNext`, `window.lbRedraw` |

> The two cards are deliberately split so they stop duplicating each other.
> The carousel arrow already existed in the markup but was never wired to anything.

### Dashboard spaces

`data-subnav="dash"`, `.dash-panel[data-space]`, `localStorage 'dashSpace'`.
The hero greeting and CTAs swap with the active space (`data-hero="me|must"`).

### Admin only (`app-admin.html`)

| Feature | Marker |
|---|---|
| **Ask HRIS** chatbot — navigate / lookup / fallback, with a permission gate | `<style id="askhris-css">`, `#askFab` |
| **Org chart hierarchy view** (tree) alongside the department view | `<style id="orgtree-css">`, `#orgView`, `var MGR={…}` |
| **Request admin actions** — edit, archive, and recover someone else's declined or expired request | `window.__rq`, `[data-rqact]` |
| **Announcements** — document + image attachments, Slack/HRIS delivery, unread bell, login popup | `<style id="anncss">`, `window.__ann`, `#annBell` |
| **Users & Roles** — account access derived from employment status | `function accessOf(st)` |
| **Inactive** — *employed but not working*: blocks access, dims the org-chart node, still counts in headcount | `<style id="inact-css">`, `.inact-note` |

### Lifting a single feature

1. Find the marker above in the file.
2. Copy the whole `<style id="…">` and/or `<script>` block. They're independent and
   guard themselves (`if(!window.openModal) return;`).
3. Anything that renders needs its container in the markup (the Ask HRIS bot injects
   its own DOM; the org tree needs `<div id="orgTree">`).

---

## Known gaps

- **Slack / HRIS announcement delivery is represented, not wired.** The UI states where
  a post goes and confirms it, but there's no Slack API behind it.
- **Org-chart reporting lines are invented** (`var MGR`). The employee data has
  departments and teams but no manager field. The rendering is data-driven, so only
  that map needs replacing.
- All data is **demo data** — no real names, emails or payroll figures.
- These files predate your Korean localization, so they're English only.
