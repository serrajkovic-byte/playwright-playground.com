import { randomUUID } from 'node:crypto';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export function createUser(overrides: Partial<User> = {}): User {
  return {
    firstName: 'Test',
    lastName: 'User',
    email: `test-${randomUUID()}@example.com`,
    password: 'TestPassword123!',
    ...overrides,
  };
}
