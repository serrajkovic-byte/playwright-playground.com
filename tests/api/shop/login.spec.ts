import { test, expect } from '../../../src/fixtures/test';
import { getShopAccounts } from '../../../src/data/test-data';

test('the demo shopper can log in and access their account', async ({ authApi }) => {
  const shopAccounts = getShopAccounts();
  const response = await authApi.login(shopAccounts.email, shopAccounts.password);
  await expect(response, 'Shop login failed').toBeOK();
  const body: unknown = await response.json();
  if (
    typeof body !== 'object' ||
    body === null ||
    !('token' in body) ||
    typeof body.token !== 'string' ||
    !body.token
  ) {
    throw new Error('Shop login did not return a valid token.');
  }

  const account = await authApi.getAccount(body.token);
  await expect(account, 'Reading the shop account failed').toBeOK();
  expect(await account.json()).toEqual(expect.objectContaining({ email: shopAccounts.email }));
});

test('a locked shopper cannot log in', async ({ authApi }) => {
  const shopAccounts = getShopAccounts();
  const response = await authApi.login(shopAccounts.lockedEmail, shopAccounts.password);

  expect(response.status()).toBe(403);
  expect(await response.json()).toEqual({
    error: 'This account is locked. Contact support.',
    code: 'ACCOUNT_LOCKED',
  });
});
