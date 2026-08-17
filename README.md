# MUST HRIS

MUST HRIS is the shared human-resources product for employees, team leads, HR operations and platform administrators. This repository keeps the production-oriented application and the approved role prototypes together so the product can evolve through one reviewed workflow.

> Current status: the root Next.js application implements the employee leave and team-lead approval flows end to end. A comprehensive admin workspace is available in `admin-prototype/`, but it is an interactive Vite prototype with mock data—not yet a server-authorized production admin application. Do not treat this repository as a fully hardened production HR platform yet.

## Product scope

The current application supports:

- Employee sign-in with Google SSO or development-only demo accounts.
- Employee leave balances, leave requests, request history, and cancellation.
- Leave policies such as increments, exact-day rules, advance requests, daily caps, overlaps, and balance checks.
- Reserved balances while a request is pending, with release or consumption after a decision.
- Team-lead approval queues and decision history.
- Role-aware navigation and server-side authorization checks.
- Seed data for local development and unit tests for the leave rules and balance logic.
- A complete, separately runnable HR operations/admin prototype covering employees, teams, organization, requests, assets, reports, documents, feedback, settings, users, roles and activity logs.

Planned work is to migrate the approved admin prototype into protected Next.js routes backed by the shared database, audit trail and production RBAC. Documents and signatures, payslips, notifications UI and broader admin APIs also require production completion. See [Current limitations](#current-limitations).

## Roles

| Role | Current access | Status |
| --- | --- | --- |
| Employee (`EMPLOYEE`) | Dashboard, leave balances, create/cancel requests, request history | Implemented |
| Team lead (`LEAD`) | Employee access plus managed-team approval queue and decision history | Implemented |
| HR operations/admin (`HR_OPS`) | Comprehensive admin prototype; role represented in the production schema | UI prototype complete; production data, APIs and authorization integration pending |
| Super admin | Admin-prototype access and platform-control designs | Production role model and server enforcement pending |

All roles belong in this repository because they share one identity model, one database and one set of HR business rules. Separate repositories are not recommended. The admin prototype remains a separate runnable app inside this repository only because its current Vite/React 19 runtime differs from the production Next.js/React 18 application. Production admin slices should move into the root application behind server-enforced authorization rather than becoming a separately deployed system of record.

## Technology

- Next.js 14 App Router and React 18
- TypeScript and Tailwind CSS
- Prisma ORM
- SQLite for local development; PostgreSQL recommended for production
- Auth.js / NextAuth with Google SSO and optional demo credentials
- Vitest
- Vite and React 19 for the separately runnable admin prototype

## Local setup

### Requirements

- Node.js 20 or newer
- npm 10 or newer
- Git

### Start the app

```bash
git clone https://github.com/must-matildaanashie/MUST-HRIS-.git
cd MUST-HRIS-
npm ci
cp .env.example .env
npm run db:push
npm run db:seed
npm run dev
```

Open <http://localhost:3000>. With `ENABLE_DEMO_LOGIN=true`, the sign-in page offers the seeded employee and team-lead accounts without Google credentials.

### Start the admin prototype

The admin workspace has its own dependency lock because it is currently an independent Vite runtime:

```bash
npm ci --prefix admin-prototype
npm run admin:dev
```

The command prints the local admin preview address. This prototype uses mock data and a client-side access preview; it does not read the root application's `.env` or production database.

Useful commands:

```bash
npm run dev          # start the local app
npm run test         # run domain unit tests
npm run typecheck    # check TypeScript
npm run lint         # run Next.js linting
npm run build        # generate Prisma client and create a production build
npm run db:push      # apply the schema to the local database
npm run db:seed      # load demo data
npm run admin:dev    # start the HR operations/admin prototype
npm run admin:build  # build the admin prototype
npm run admin:test   # verify the admin hosting worker
```

## Environment variables

Copy `.env.example` to `.env`. Never commit `.env`, `.env.local`, tokens, private keys, or production database URLs.

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Prisma connection string. The local default is `file:./dev.db`. |
| `NEXTAUTH_SECRET` | Yes outside local demos | Signs authentication tokens. Generate a strong random value. |
| `NEXTAUTH_URL` | Yes | Canonical app URL, such as `http://localhost:3000`. |
| `GOOGLE_CLIENT_ID` | Production SSO | Google OAuth client ID. |
| `GOOGLE_CLIENT_SECRET` | Production SSO | Google OAuth client secret. |
| `ALLOWED_EMAIL_DOMAIN` | Recommended | Restricts Google sign-in to the company domain. |
| `ENABLE_DEMO_LOGIN` | Development only | Enables seeded credential shortcuts. Must be `false` in production. |

For production, use PostgreSQL, change the Prisma datasource provider accordingly, and run migrations as part of the release process.

## Repository structure

```text
.
├── src/
│   ├── app/                  # pages, layouts, and API routes
│   ├── components/           # shared UI components
│   ├── domain/               # framework-independent HR business rules
│   ├── lib/                  # database, auth, session, API, and navigation helpers
│   └── types/                # TypeScript extensions
├── prisma/
│   ├── schema.prisma         # employee, leave, notification, document, and payslip models
│   └── seed.ts               # local employee and team-lead demo data
├── prototype/                # earlier static UX reference; not the production app
├── admin-prototype/          # complete interactive admin UI reference (Vite + mock data)
│   ├── src/                  # admin screens, responsive styles and interactions
│   ├── public/assets/        # approved local logo and font assets
│   ├── tests/                # hosting-worker verification
│   └── README.md             # coverage and production migration boundary
├── .github/                  # CI, ownership, and contribution templates
├── CONTRIBUTING.md           # team workflow and review rules
└── .env.example              # safe configuration template
```

The `prototype/` folder preserves the original employee/team-lead static experience. The `admin-prototype/` folder preserves the complete interactive admin build. New production capabilities belong in the root `src/` application; prototype-only work must be labelled as such and must never be represented as server-authorized functionality.

## Collaboration workflow

`main` should always remain reviewable and runnable. Do not commit or push directly to it.

1. Sync your local `main`.
2. Create a short-lived branch from `main`.
3. Make one focused change.
4. Run tests, type checks, and a build when relevant.
5. Push your branch and open a pull request.
6. Request review, address feedback, and merge only after checks pass.

Branch names use a category and short description:

```text
feature/admin-employee-directory
fix/leave-balance-calculation
docs/local-setup
chore/update-dependencies
```

Pull requests should explain the problem, the solution, affected roles, screenshots for UI changes, database or environment changes, and the checks performed. Full details are in [CONTRIBUTING.md](CONTRIBUTING.md).

Repository maintainers should enable a GitHub ruleset for `main` requiring pull requests, at least one approval, passing CI, resolved conversations, and blocked force pushes/deletions. Repository files can guide the workflow, but only GitHub branch protection can enforce it.

## Clone or fork

Team members with write access should clone the main repository and push feature branches:

```bash
git clone https://github.com/must-matildaanashie/MUST-HRIS-.git
cd MUST-HRIS-
git switch main
git pull --ff-only
git switch -c feature/short-description
```

External contributors, or team members without write access, should fork the repository in GitHub and then clone their fork:

```bash
git clone https://github.com/YOUR-USERNAME/MUST-HRIS-.git
cd MUST-HRIS-
git remote add upstream https://github.com/must-matildaanashie/MUST-HRIS-.git
git fetch upstream
git switch -c feature/short-description upstream/main
```

Push the branch to `origin`, then open a pull request into `must-matildaanashie/MUST-HRIS-:main`.

## Current limitations

- The admin UI is complete as an interactive prototype, but it is not yet connected to the root application's Prisma data, Auth.js session or server-side `HR_OPS` authorization.
- Super-admin controls are designed in the prototype but do not yet have a production role model or protected server actions.
- Documents, payslips, and notifications have partial data foundations but incomplete user interfaces.
- Demo authentication must never be enabled in production.
- SQLite is for local development; production should use PostgreSQL and reviewed migrations.
- API route and end-to-end test coverage still needs expansion.
- Audit logging, security review, retention rules, backups, and operational monitoring are required before handling real employee records.

## Deployment

For a production deployment:

1. Provision PostgreSQL and update the Prisma datasource provider.
2. configure the production environment variables listed above.
3. Set `ENABLE_DEMO_LOGIN=false`.
4. Run reviewed database migrations.
5. Build the production application with `npm run build`.
6. If sharing the admin prototype for review, build it separately with `npm run admin:build`; do not connect it to real HR data.
7. Complete security, privacy, backup, and access-control reviews before importing real employee records.

The static prototype remains available at <https://must-hris.vercel.app>, but it is not the production application in this repository.
