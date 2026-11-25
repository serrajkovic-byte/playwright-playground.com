# Playwright Automation

Playwright test automation project using TypeScript.

## Setup

```bash
npm ci
npx playwright install
```

Copy `.env.example` to `.env` and set `BASE_URL` to the application under test.
The API URL variables are available for the API clients when they are implemented.

## Commands

- `npm test` - run the Playwright test suite
- `npm run test:ui` - open Playwright UI mode
- `npm run test:headed` - run tests with a visible browser
- `npm run test:report` - open the last HTML report
- `npm run typecheck` - check TypeScript types

Page objects, API clients, schemas, fixtures, and reusable test data belong under
`src/`. Tests are organized by UI, API, and end-to-end coverage under `tests/`.
