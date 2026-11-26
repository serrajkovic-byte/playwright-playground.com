# Playwright Automation

Playwright and TypeScript scaffold for web and API tests of the
[playground shop](https://playwright-playground.com/shop). Page objects, API
clients and shop tests are not implemented yet; the current example tests
exercise the Playwright documentation website.

## Setup

Use Node.js 20.19+, 22.13+ or 24+ and npm:

```powershell
npm ci
npx playwright install
Copy-Item .env.example .env
```

The default application origin is `https://playwright-playground.com`. Set
`BASE_URL` in `.env` to test another environment. UI tests can navigate to
`/shop` (for example, `page.goto('/shop')`). `SHOP_API_URL` and
`PRACTICE_API_URL` are reserved for future API clients and are not currently
consumed. Never put real credentials in `.env.example` or commit `.env`.

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
