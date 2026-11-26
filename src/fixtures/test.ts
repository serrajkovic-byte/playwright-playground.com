import { expect, test as base } from '@playwright/test';
import { BasePage } from '../ui/pages/base.page';

type TestFixtures = {
  basePage: BasePage;
};

export const test = base.extend<TestFixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
});

export { expect };
