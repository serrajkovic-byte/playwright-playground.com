import { test, expect } from '@playwright/test';
test('has title', async ({ page }) => {
    await page.goto('https://playwright-playground.com/shop');

    await page.getByRole('link', { name: 'Audio' }).click();
    await page.getByRole('listitem').filter({ hasText: 'Echo Bluetooth Speaker$79.' }).getByRole('button').click();
    await page.getByRole('link', { name: 'Cart (1)' }).click();
    await page.getByRole('link', { name: 'Proceed to checkout' }).click();
    await page.getByRole('button', { name: 'Continue to payment' }).click();
    await page.locator('iframe[title="Secure payment"]').contentFrame().getByRole('textbox', { name: 'Card number' }).click();
    await page.getByText('Test cards').click();
    await page.getByText('4242 4242 4242').click();
    await page.getByRole('cell', { name: '4242 4242 4242' }).click();
    await page.locator('body').press('ControlOrMeta+c');
    await page.locator('iframe[title="Secure payment"]').contentFrame().getByRole('textbox', { name: 'Card number' }).click({
        modifiers: ['ControlOrMeta']
    });
    await page.locator('iframe[title="Secure payment"]').contentFrame().getByRole('textbox', { name: 'Card number' }).fill('4242 4242 4242 4242');
    await page.locator('iframe[title="Secure payment"]').contentFrame().getByRole('textbox', { name: 'Expiry date' }).click();
    await page.locator('iframe[title="Secure payment"]').contentFrame().getByRole('textbox', { name: 'Expiry date' }).fill('12/30');
    await page.locator('iframe[title="Secure payment"]').contentFrame().getByRole('textbox', { name: 'CVC' }).click();
    await page.locator('iframe[title="Secure payment"]').contentFrame().getByRole('textbox', { name: 'CVC' }).fill('123');
    await page.locator('iframe[title="Secure payment"]').contentFrame().getByRole('textbox', { name: 'Name on card' }).click();
    await page.locator('iframe[title="Secure payment"]').contentFrame().getByRole('textbox', { name: 'Name on card' }).fill('Test');
    await page.locator('iframe[title="Secure payment"]').contentFrame().getByRole('button', { name: 'Pay $' }).click();
    await page.getByRole('link', { name: 'Continue shopping' }).click();
});