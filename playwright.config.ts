import { defineConfig, devices } from '@playwright/test';

import 'dotenv/config';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry only in CI */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Use a visible terminal report locally and HTML/JUnit reports for CI. */
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }], ['junit', { outputFile: 'test-results/junit.xml' }]]
    : [['list'], ['html', { open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Application origin; UI tests can navigate to /shop. */
    baseURL: process.env.BASE_URL || 'https://playwright-playground.com/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure API, desktop browser, and mobile projects. */
  projects: [
  { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      testIgnore: '**/api/**',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  {
    name: 'api',
    testMatch: '**/api/**/*.spec.ts',
  },
  {
    name: 'firefox',
    testIgnore: '**/api/**',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    testIgnore: '**/api/**',
    use: { ...devices['Desktop Safari'] },
  },
  {
    name: 'mobile',
    testIgnore: '**/api/**',
    use: { ...devices['Pixel 7'] },
  },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
