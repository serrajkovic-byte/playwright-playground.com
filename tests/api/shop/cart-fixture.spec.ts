import { test, expect } from '../../../src/fixtures/test';

test('the cart fixture creates an isolated cart with an item', async ({
  cartWithItems,
  request,
}) => {
  const response = await request.get('/api/shop/cart', {
    headers: { 'X-Shop-Cart': cartWithItems.cartId },
  });

  await expect(response).toBeOK();
  const cart = await response.json();
  expect(cart.id).toBe(cartWithItems.cartId);
  expect(cart.itemCount).toBe(1);
  expect(cartWithItems.storageState.origins).toEqual([
    {
      origin: new URL(response.url()).origin,
      localStorage: [{ name: 'qa-shop-cart', value: cartWithItems.cartId }],
    },
  ]);
});
