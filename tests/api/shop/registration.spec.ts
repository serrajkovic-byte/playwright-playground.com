import { test, expect } from '../../../src/fixtures/test';
import { createUser } from '../../../src/data/factories/user.factory';

test('a registered user can access their account', async ({ authedUser, authApi }) => {
  const response = await authApi.getAccount(authedUser.token);

  await expect(response).toBeOK();
  const account = await response.json();
  expect(account.email).toBe(authedUser.user.email);
  expect(authedUser.storageState.origins).toEqual([
    {
      origin: new URL(response.url()).origin,
      localStorage: [{ name: 'qa-shop-token', value: authedUser.token }],
    },
  ]);
});

test('registration rejects an invalid email', async ({ authApi }) => {
  const response = await authApi.register(createUser({ email: 'not-an-email' }));

  expect(response.status()).toBe(400);
});

test('registration rejects a weak password', async ({ authApi }) => {
  const response = await authApi.register(createUser({ password: 'short' }));

  expect(response.status()).toBe(400);
});

test('registration rejects an email that is already registered', async ({
  authApi,
  authedUser,
}) => {
  const response = await authApi.register(authedUser.user);

  expect(response.status()).toBe(409);
});
