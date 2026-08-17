# Contributing to MUST HRIS

Thank you for helping build MUST HRIS. The repository uses short-lived branches and pull requests so employee, team-lead, and HR operations changes stay coordinated in one codebase.

## Ground rules

- Never commit directly to `main`.
- Never commit secrets, `.env` files, production employee data, database files, or exported HR records.
- Keep each pull request focused on one problem.
- Preserve role boundaries. A hidden button is not authorization; protected actions must also be checked on the server.
- Add or update tests when business rules change.
- Call out schema, migration, environment, security, or privacy impact in the pull request.

## Choose clone or fork

If you have write access, clone the shared repository and push a branch. If you do not have write access, fork it and open a pull request from your fork. Both approaches use the same review rules.

## Start a change

```bash
git switch main
git pull --ff-only
git switch -c feature/short-description
```

Use one of these prefixes:

- `feature/` for a user-visible capability
- `fix/` for a defect
- `docs/` for documentation only
- `test/` for test coverage
- `refactor/` for behavior-preserving code changes
- `chore/` for maintenance

Use lowercase kebab-case after the prefix. Examples: `feature/hr-ops-dashboard`, `fix/pending-balance-release`, and `docs/deployment-guide`.

## Develop locally

```bash
npm ci
cp .env.example .env
npm run db:push
npm run db:seed
npm run dev
```

Keep production work in `src/`. The `prototype/` directory is the employee/team-lead static reference. The `admin-prototype/` directory is the separately runnable admin reference and should change only when a task explicitly updates that prototype. Do not present either prototype as production-integrated functionality.

## Validate the change

Run the checks relevant to your work before opening a pull request:

```bash
npm run test
npm run typecheck
npm run lint
npm run build
```

If the admin prototype changes, install and validate its independent runtime too:

```bash
npm ci --prefix admin-prototype
npm run admin:build
npm run admin:test
```

For UI changes, manually test the affected employee, lead, and HR operations roles and attach before/after screenshots. The admin prototype is intentionally separate from the production Next.js runtime; a prototype change must not be described as a server-authorized production capability. For database changes, include a migration and explain rollback or compatibility considerations.

## Commit and push

Write short, imperative commit messages:

```text
Add HR operations employee directory
Fix reserved leave balance release
Document Google SSO setup
```

Then push your branch:

```bash
git push -u origin feature/short-description
```

## Open a pull request

Open the pull request against `main`, complete the template, and keep it as a draft until it is ready for review. A reviewer should be able to understand:

- what changed and why;
- which roles and flows are affected;
- how the change was verified;
- whether schema, environment, privacy, or security behavior changed;
- how to review any visual change.

Resolve review conversations and update the branch when `main` changes. Do not force-push after review has started unless you coordinate with reviewers.

## Merge policy

A change is ready to merge when CI passes, at least one maintainer approves it, review conversations are resolved, and the branch has no conflicts. Prefer squash merging so each pull request becomes one clear change in `main`.

Maintainers should protect `main` with a GitHub ruleset. The recommended settings are: pull request required, one approval required, CODEOWNERS review required for sensitive paths, status checks required, conversations resolved, force pushes blocked, and branch deletion blocked.

## Reporting security or privacy concerns

Do not open a public issue containing credentials, personal employee data, or an exploitable security detail. Contact a repository maintainer privately and rotate exposed credentials immediately.
