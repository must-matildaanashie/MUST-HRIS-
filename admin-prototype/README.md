# MUST HRIS Admin Prototype

This directory contains the complete interactive HR operations and administration prototype. It is preserved in the same repository as the production-oriented employee and team-lead application so product, design and engineering can review one coherent HRIS codebase.

The prototype is a Vite/React application with realistic mock data and client-side interactions. It is not yet connected to the root Next.js application's authentication, Prisma database or server authorization. Do not use it with real employee data or describe its client-side role switcher as production access control.

## Coverage

- Admin dashboard and operational metrics
- Employee directory, grid/table views and employee details
- Teams, team membership and organization chart
- Leave requests, leave balances and request administration
- Assets, announcements, documents, reports and feedback cycles
- Departments, company entities, leave types and request types
- Feedback-form builder, users, roles and access previews
- Activity logs and super-admin platform controls
- Employee and team-lead reference views used to keep the design system aligned
- Desktop and mobile-responsive layouts, empty states and representative error states

## Run locally

From the repository root:

```bash
npm ci --prefix admin-prototype
npm run admin:dev
```

Or from this directory:

```bash
npm ci
npm run dev
```

Vite prints the local preview address. The application uses browser-history routes, so direct paths such as `/employees`, `/reports` and `/settings/platform` are supported by the included deployment rewrites.

## Validate

From the repository root:

```bash
npm run admin:build
npm run admin:test
```

The build produces the static client plus the hosting files required by the existing Sites-compatible worker.

## Production migration boundary

New production HR operations work belongs in the root `src/` application. Migrate the prototype in vertical slices:

1. Define the HR operation and permission in the root authorization model.
2. Add or update the Prisma schema and reviewed migration where needed.
3. Implement server-side queries/actions and an audit event.
4. Reuse the approved prototype layout in a protected Next.js route.
5. Add domain, API and role-based tests.
6. Verify employee, team-lead, admin and super-admin access independently.

Keeping this boundary explicit preserves the complete admin design without presenting mock interactions as production functionality.
