# MUST HRIS

MUST HRIS is the shared human-resources application for employees, team leads, and HR operations. This repository contains the production-oriented Next.js application and the original static prototype used as a design reference.

> Current status: the employee leave flow and team-lead approval flow are implemented end to end. The `HR_OPS` role exists in the data model, but a dedicated admin workspace and complete admin permissions are still roadmap work. Do not treat this repository as a fully hardened production HR platform yet.

## Product scope

The current application supports:

- Employee sign-in with Google SSO or development-only demo accounts.
- Employee leave balances, leave requests, request history, and cancellation.
- Leave policies such as increments, exact-day rules, advance requests, daily caps, overlaps, and balance checks.
- Reserved balances while a request is pending, with release or consumption after a decision.
- Team-lead approval queues and decision history.
- Role-aware navigation and server-side authorization checks.
- Seed data for local development and unit tests for the leave rules and balance logic.

Planned work includes the HR operations/admin workspace, employee administration, policies, documents and signatures, payslips, notifications UI, audit logs, and stronger production RBAC. See [Current limitations](#current-limitations).

## Roles

| Role | Current access | Status |
| --- | --- | --- |
| Employee (`EMPLOYEE`) | Dashboard, leave balances, create/cancel requests, request history | Implemented |
| Team lead (`LEAD`) | Employee access plus managed-team approval queue and decision history | Implemented |
| HR operations/admin (`HR_OPS`) | Role is represented in the schema | Admin workspace and policies are not yet implemented |

All roles belong in this repository because they share one identity model, one database, one set of HR business rules, and one deployment. Role separation should happen through authorization and route boundaries, not separate repositories.

## Technology

- Next.js 14 App Router and React 18
- TypeScript and Tailwind CSS
- Prisma ORM
- SQLite for local development; PostgreSQL recommended for production
- Auth.js / NextAuth with Google SSO and optional demo credentials
- Vitest

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


Useful commands:

```bash
npm run dev          # start the local app
npm run test         # run domain unit tests
npm run typecheck    # check TypeScript
npm run lint         # run Next.js linting
npm run build        # generate Prisma client and create a production build
npm run db:push      # apply the schema to the local database
npm run db:seed      # load demo data
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
├── .github/                  # CI, ownership, and contribution templates
├── CONTRIBUTING.md           # team workflow and review rules
└── .env.example              # safe configuration template
```

The `prototype/` folder is intentionally retained as a reference for broader screens and interactions. New production work belongs in `src/`; do not add features only to the prototype.

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

The static prototype remains available at <https://must-hris.vercel.app>, but it is not the production application in this repository.
