# Playwright Automation

Playwright and TypeScript tests for the
[playground shop](https://playwright-playground.com/shop), including API
registration, isolated cart fixtures and authenticated UI coverage. The
example tests in `tests/example.spec.ts` exercise the Playwright documentation
website.

## Setup

Use Node.js 20.19+, 22.13+ or 24+ and npm:

```powershell
npm ci
npx playwright install
Copy-Item .env.example .env
```

The default application origin is `https://playwright-playground.com`. Set
`BASE_URL` in `.env` to test another environment. UI tests can navigate to
`/shop` (for example, `page.goto('/shop')`). `PRACTICE_API_URL` optionally
overrides the origin for the practice API client; `SHOP_API_URL` is reserved
for future use. Never put real credentials in `.env.example` or commit `.env`.

The shop API login and website sign-in tests require `SHOP_EMAIL`,
`SHOP_LOCKED_EMAIL` and `SHOP_PASSWORD` in `.env` or the environment. Use
the demo accounts shown on the [shop sign-in page](https://playwright-playground.com/shop/sign-in).
For CI, configure GitHub Actions secrets with those same names; pull requests
from forks cannot access repository secrets.
Practice users created through `/api/users` are separate from shop accounts.
The practice API test removes its own user after verification.

Installing dependencies enables the Husky pre-commit hook in this checkout. It
runs lint and formatting checks across the working tree; fix any failures before
committing. CI runs the same checks.

## Commands

| Command                | Purpose                                 |
| ---------------------- | --------------------------------------- |
| `npm test`             | Run the Playwright test suite           |
| `npm run test:ui`      | Open Playwright UI mode                 |
| `npm run test:headed`  | Run tests with a visible browser        |
| `npm run test:report`  | Open the last HTML report               |
| `npm run typecheck`    | Check TypeScript types                  |
| `npm run lint`         | Run ESLint                              |
| `npm run format`       | Format supported files with Prettier    |
| `npm run format:check` | Check formatting without changing files |

TypeScript 7 provides `tsc`; the TypeScript 6 compatibility package supplies
the compiler API required by typescript-eslint.

The `src/` and `tests/` directories are organized for UI, API and end-to-end
coverage. See [branch protection](.github/BRANCH_PROTECTION.md) for the branch
naming convention and repository administrator settings.
