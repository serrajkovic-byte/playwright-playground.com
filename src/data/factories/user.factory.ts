import { randomUUID } from 'node:crypto';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type PracticeUser = {
  firstName: string;
  lastName: string;
  role: 'Admin' | 'Manager' | 'User';
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

export function createPracticeUser(overrides: Partial<PracticeUser> = {}): PracticeUser {
  return {
    firstName: 'Test',
    lastName: `User-${randomUUID()}`,
    role: 'User',
    ...overrides,
  };
}
