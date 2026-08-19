# Design system reference — MUST HRIS

Canonical source: `src/styles.css`, imported by `src/main.jsx` and consumed exclusively via `className` by `src/App.jsx` (the live app). This is the file all other styling — mockups, patch blocks, future components — must match. Everything below is extracted directly from it; when it and this doc disagree, re-derive from the CSS, not from this file.

## Foundations

**Color tokens** (`:root`)
```
--green:#018038        --green-dark:#016A2D   --green-lite:#04a457   --green-soft:#E6F4EC
--ink:#212826           --muted:#6b7280        --subtle:#9aa2ab      --line:#e9ecef
--wash:#eef1f4          --card:#fff            --red:#d64545
--sh:0 10px 30px -16px rgba(15,40,28,.14)      --sh-lg:0 18px 44px -18px rgba(15,40,28,.22)
--shadow: var(--sh)
```
No `--danger`/`--warning`/`--info` semantic tokens exist yet, despite consistent amber (`#b9770e`/`#fff4e5`) and red (`#c0392b`/`#fdecec`) usage for status states — worth introducing if the status/badge system grows.

**Typography**
- Body: `--sans: "Inter", system-ui, sans-serif`. Headings/display: `--display: "Work Sans", var(--sans)`.
- Sizes are px-first: h1 `30px`, h2 `16px`, h3 `15px`, body `14px`, labels/captions `10.5–11px`, `.metric-value` `32px`. Two rem outliers exist (`.phero-id h1: 1.35rem`, `.avatar-lg: 2rem`) — prefer px to match the rest unless there's a reason for the exception.
- Weights: 400/500/600/700, plus an unusual `650` used on ~8 selectors (`.card-head>button`, `.pill-tabs button`). Keep using `650` only where already established rather than introducing new weights.
- No fluid/`clamp()` typography anywhere — sizing is fixed. Don't introduce fluid type into this file without a reason; it'd be a new pattern with no existing precedent to match.

**Shadows**: two tokens only, `--sh` / `--sh-lg`, both a dark-green-tinted `rgba(15,40,28,x)` family. Several one-off shadows exist beyond these (`.modal` `rgba(0,0,0,.5)`, `.login-card` `rgba(0,0,0,.55)`, `.ask-hris-panel` `rgba(0,0,0,.4)`) that could collapse into a third `--sh-modal` token. The focus-ring shadow `0 0 0 4px rgba(1,128,56,.1)` is duplicated verbatim 3× (`.search-box:focus-within`, `.field input:focus`, `.ask-hris-input-row input:focus`) — a `--focus-ring` token would remove the duplication.

**Radii**: no scale — card-like containers alone use `20px` (`.card`), `22px` (`.modal`, `.avatar-lg`), `15px` (`.employee-directory-card`, `.live-team-card`), `14px` (`.record-card`, employee tables), `13px` (`.hier-card`). Buttons `12px`, inputs `11px`. Treat these five card radii as the existing (imperfect) vocabulary — don't add a sixth without consolidating.

**Breakpoints**: `390, 430, 481(min), 700, 701(min), 900, 960, 1000, 1024, 1100` — `max-width:700px` is reused across ~14 separate blocks rather than consolidated. New responsive work should reuse `700`/`900`/`1100` rather than adding new widths.

## Component reference (canonical class names)

| Component | Class | Notes |
|---|---|---|
| Icon button | `.icon-btn` | 42×42px, radius 12px |
| Primary/secondary/danger button | `.btn`, `.btn.secondary`, `.btn.danger` | dot-modifier convention, height 44px |
| Status pill | `.status` + `.active/.pending/.inactive/...` modifiers | defined **twice** in styles.css (~line 8 and ~line 146) — redundant, should be merged into one rule set to avoid the two copies drifting from each other |
| Form field | `.field` (wraps `.field input/textarea`) | focus ring `0 0 0 4px rgba(1,128,56,.1)` |
| Tabs | `.tabs`, `.line-tabs`, `.pill-tabs` | three variants, no fourth should be added without checking these first |
| Avatar | `.avatar`, `.avatar.small`, `.avatar-lg` | `.avatar.small` is currently a bug: it's 38×38px, identical to base `.avatar` — only the font-size (11px vs 13px) actually changes. If a visually smaller avatar is needed, fix the dimensions here rather than adding a new class. |
| Table | `table` / `th` / `td` | single system, no per-page variants |
| Modal | `.modal`, `.modal.wide` | width `min(570px,100%)` / `min(820px,100%)` |

## Known drift (as of 2026-08-18)

An audit compared `styles.css` against `src/app.html` ("Employee" mockup), `src/app-male.html` ("Employee — Male profile" mockup), `src/index.html` (sign-in), and `../src/app.html` (a fifth variant one level up). These are static, standalone exports with their own embedded `<style>` blocks — none of them import `styles.css`, so nothing currently keeps them in sync automatically.

**Real, user-visible drift:**
- `index.html` uses different values for shared token names: `--ink:#242424` (vs `#212826`), `--muted:#6f6f6f` (vs `#6b7280`), `--subtle:#9a9a9a` (vs `#9aa2ab`), `--line:#ececea` (vs `#e9ecef`). It defines no `--sh`/`--sh-lg` and instead hardcodes three bespoke shadows (one pure-black-based, one green-based) that don't match the app's shadow family.
- `../src/app.html` loads Google Fonts weights 500/600/700 for Work Sans but uses `font-weight:800` six times (`.pslip-*`, `.sd-logo`) — that weight was never loaded, so it's rendering synthetic-bold or silently falling back.
- The three mockups share an almost entirely different breakpoint vocabulary (440/520/560/600/640/680/860/900/1000/1100/1150/1240) from `styles.css`'s (390/430/700/900/960/1000/1024/1100) — only 900/1000/1100 overlap.

**Structural drift (same component, different name — can't be fixed by find-replacing a value):**
| Canonical (styles.css) | Mockups use instead |
|---|---|
| `.icon-btn` | `.iconbtn` |
| `.field` | `.fld` |
| `.status` + modifiers | no equivalent — replaced by unrelated `.pstatus`, `.badge.b-*`, `.pay-badge`, `.apr-badge`, `.trh-status`, `.tm-lvl` |
| `.btn.danger` | separate `.btn-danger` class (and in `app.html`/`app-male.html`, defined but never applied — dead CSS) |
| `.tabs`/`.line-tabs`/`.pill-tabs` | reimplemented per-page as `.sig-tabs`, `.seg`, `.hol-toggle`, `.lv-unit` |
| `.avatar` (3 size variants) | 7–8 separately-named avatar classes (`.av`, `.pfp`, `.pfp.lg`, `.hpfp`, `.tm-avwrap .av`, `.thc-av`, `.th-av`) across 3 different corner-radius treatments |

**Cause**: each mockup embeds 3–4 separate `<style>` blocks (a head block plus later "v2"/"AskHR" patch blocks appended mid-body). The patch blocks are where new, untokenized colors and shadow families get introduced instead of reusing `:root` tokens — this is the recurring mechanism behind most of the color/shadow drift above, not a one-off mistake per file.

**Not yet decided**: whether to reconcile these mockups onto the canonical class names/tokens, or treat them as disposable reference exports that don't need to stay in sync. Fixing the structural drift means rewriting class names across ~2,000+ line files each — worth a deliberate scope decision before starting, not a default action.
