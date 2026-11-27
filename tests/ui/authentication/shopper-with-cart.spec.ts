import { test, expect } from '../../../src/fixtures/test';

test('a registered shopper sees their cart', async ({ browser, baseURL, shopperWithCart }) => {
  const context = await browser.newContext({ baseURL, storageState: shopperWithCart.storageState });

  try {
    const page = await context.newPage();
    await page.goto('/shop');

    await expect(page.getByText('Cart (1)')).toBeVisible();
    await expect(
      page.getByText(`Hi, ${shopperWithCart.user.firstName}`, { exact: true }),
    ).toBeVisible();
  } finally {
    await context.close();
  }
});
