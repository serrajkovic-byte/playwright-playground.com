import { test as setup, expect } from '@playwright/test';
// import {faker} from '@faker-js/faker';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

//Generate a unique one-time user for every  test run

setup('register and save session', async ({ page }) => {
  // const firstName = faker.person.firstName();
  // const lastName = faker.person.lastName();
  // const name = `${firstName} ${lastName}`;
  // const email = faker.internet.email({ firstName, lastName, provider: 'example.com' });
  // const password = `${faker.string.alpha(8)}${faker.string.numeric(1)}`;

  await page.goto('https://playwright-playground.com/shop/sign-in');

  // await page.getByRole('textbox', { name: 'Name' }).fill(name);
  await page.getByRole('textbox', { name: 'Email' }).fill('alex@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Password1');
  await page.getByRole('button', { name: 'Sign in' }).click();
  // await page.getByRole('button', { name: 'Register' }).click();
  // await expect(page.getByTestId('account-name')).toHaveText('Hi, Alex');
  await expect(page.getByText('Hi, Alex')).toBeVisible();
  await page.context().storageState({ path: authFile });
});
