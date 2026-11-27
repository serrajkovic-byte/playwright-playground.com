import { createPracticeUser } from '../../../src/data/factories/user.factory';
import { test, expect } from '../../../src/fixtures/test';

test('creates and retrieves a practice user', async ({ practiceApi }) => {
  const user = createPracticeUser();
  const response = await practiceApi.createUser(user);
  expect(response.status()).toBe(201);
  const created: unknown = await response.json();

  if (
    typeof created !== 'object' ||
    created === null ||
    !('id' in created) ||
    typeof created.id !== 'number' ||
    !Number.isInteger(created.id)
  ) {
    throw new Error('Creating the practice user did not return a valid numeric id.');
  }

  const id = created.id;
  try {
    expect(created).toEqual({ id, ...user });
    expect(response.headers().location).toBe(`/api/users/${id}`);

    const retrieved = await practiceApi.getUser(id);
    await expect(retrieved).toBeOK();
    expect(await retrieved.json()).toEqual(created);
  } finally {
    const deleted = await practiceApi.deleteUser(id);
    expect(deleted.status(), 'Deleting the test user failed').toBe(204);
  }
});
