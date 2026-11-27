import { randomUUID } from 'node:crypto';
import {
  expect,
  test as base,
  type APIRequestContext,
  type BrowserContext,
} from '@playwright/test';
import { AuthApiClient } from '../api/clients/auth-api.client';
import { createUser, type User } from '../data/factories';
import { BasePage } from '../ui/pages/base.page';

type StorageState = Awaited<ReturnType<BrowserContext['storageState']>>;

type AuthenticatedUser = {
  user: User;
  token: string;
  storageState: StorageState;
};

type CartWithItems = {
  cartId: string;
  storageState: StorageState;
};

type ShopperWithCart = {
  user: User;
  token: string;
  cartId: string;
  storageState: StorageState;
};

type TestFixtures = {
  basePage: BasePage;
  authApi: AuthApiClient;
  authedUser: AuthenticatedUser;
  cartWithItems: CartWithItems;
  shopperWithCart: ShopperWithCart;
};

async function clearTestCart(
  request: APIRequestContext,
  cartUrl: string,
  headers: Record<string, string>,
): Promise<void> {
  const response = await request.get(cartUrl, { headers });
  await expect(response, 'Reading the test cart for cleanup failed').toBeOK();
  const cart: unknown = await response.json();

  if (
    typeof cart !== 'object' ||
    cart === null ||
    !('items' in cart) ||
    !Array.isArray(cart.items)
  ) {
    throw new Error('The test cart did not return an items array.');
  }

  const items: unknown[] = cart.items;
  for (const item of items) {
    if (
      typeof item !== 'object' ||
      item === null ||
      !('id' in item) ||
      typeof item.id !== 'string'
    ) {
      throw new Error('The test cart returned an item without a valid id.');
    }

    const deleted = await request.delete(`${cartUrl}/items/${encodeURIComponent(item.id)}`, {
      headers,
    });
    await expect(deleted, 'Cleaning up the test cart failed').toBeOK();
  }
}

export const test = base.extend<TestFixtures>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  authApi: async ({ request, baseURL }, use) => {
    if (!baseURL) {
      throw new Error('BASE_URL is required for the auth API fixture.');
    }

    await use(new AuthApiClient(request, baseURL));
  },
  authedUser: async ({ authApi, baseURL }, use) => {
    if (!baseURL) {
      throw new Error('BASE_URL is required for the authenticated user fixture.');
    }

    const user = createUser();
    const response = await authApi.register(user);
    await expect(response, 'Registering the test user failed').toBeOK();
    const body: unknown = await response.json();

    if (
      typeof body !== 'object' ||
      body === null ||
      !('token' in body) ||
      typeof body.token !== 'string' ||
      !body.token
    ) {
      throw new Error('Registration did not return a valid token.');
    }

    await use({
      user,
      token: body.token,
      storageState: {
        cookies: [],
        origins: [
          {
            origin: new URL(baseURL).origin,
            localStorage: [{ name: 'qa-shop-token', value: body.token }],
          },
        ],
      },
    });
  },
  cartWithItems: async ({ request, baseURL }, use) => {
    if (!baseURL) {
      throw new Error('BASE_URL is required for the cart fixture.');
    }

    const cartId = randomUUID();
    const headers = { 'X-Shop-Cart': cartId };
    const cartUrl = new URL('/api/shop/cart', baseURL).toString();
    const response = await request.post(`${cartUrl}/items`, {
      headers,
      data: { slug: 'compact-hd-tv', quantity: 1 },
    });
    await expect(response, 'Adding the test cart item failed').toBeOK();

    try {
      await use({
        cartId,
        storageState: {
          cookies: [],
          origins: [
            {
              origin: new URL(baseURL).origin,
              localStorage: [{ name: 'qa-shop-cart', value: cartId }],
            },
          ],
        },
      });
    } finally {
      await clearTestCart(request, cartUrl, headers);
    }
  },
  shopperWithCart: async ({ authedUser, cartWithItems, baseURL }, use) => {
    if (!baseURL) {
      throw new Error('BASE_URL is required for the shopper with cart fixture.');
    }

    await use({
      user: authedUser.user,
      token: authedUser.token,
      cartId: cartWithItems.cartId,
      storageState: {
        cookies: [],
        origins: [
          {
            origin: new URL(baseURL).origin,
            localStorage: [
              { name: 'qa-shop-token', value: authedUser.token },
              { name: 'qa-shop-cart', value: cartWithItems.cartId },
            ],
          },
        ],
      },
    });
  },
});

export { expect };
