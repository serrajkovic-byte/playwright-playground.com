import { createServer } from 'node:http';
import { request as playwrightRequest, test, expect } from '@playwright/test';
import { BaseApiClient } from '../../src/api/clients/base-api.client';

class TestApiClient extends BaseApiClient {
  read(path: string) {
    return this.get(path);
  }
}

test('resolves API paths from the origin even when the base URL has a path', async () => {
  const server = createServer((incoming, outgoing) => {
    outgoing.end(incoming.url);
  });
  await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));

  const address = server.address();
  if (!address || typeof address === 'string') {
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
    throw new Error('The test server did not bind to a TCP address.');
  }

  const apiRequest = await playwrightRequest.newContext();
  try {
    const client = new TestApiClient(apiRequest, `http://127.0.0.1:${address.port}/base`);
    const response = await client.read('/api/shop/me');

    await expect(response).toBeOK();
    expect(await response.text()).toBe('/api/shop/me');
  } finally {
    await apiRequest.dispose();
    await new Promise<void>((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
});
