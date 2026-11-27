import { test, expect } from '../../../src/fixtures/test';
import { getShopAccounts } from '../../../src/data/test-data';

test('signs in to the shop with the demo account', async ({ page }) => {
  test.setTimeout(60_000);
  const shopAccounts = getShopAccounts();
  await page.goto('/shop/sign-in');
  await page.getByLabel('Email').fill(shopAccounts.email);
  await page.getByLabel('Password').fill(shopAccounts.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByText('Hi, Alex', { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByText('Hi, Alex', { exact: true })).toBeVisible();
});

test('rejects a locked shop account', async ({ page }) => {
  test.setTimeout(60_000);
  const shopAccounts = getShopAccounts();
  await page.goto('/shop/sign-in');
  await page.getByLabel('Email').fill(shopAccounts.lockedEmail);
  await page.getByLabel('Password').fill(shopAccounts.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByRole('alert')).toHaveText('This account is locked. Contact support.');
});
