import { createAddress, createCard } from '../../../src/data/factories';
import { expect, test } from '../../../src/fixtures/test';

type CreatedOrder = {
  id: string;
  email: string;
  status: string;
  totalCents: number;
};

test('places an order for one Compact HD TV through the Shop API', async ({
  request,
  shopperWithCart,
}) => {
  const { firstName, lastName, email } = shopperWithCart.user;
  const address = createAddress({
    street: '1 Test Lane',
    city: 'Warsaw',
    postalCode: '00-001',
    country: 'Poland',
  });
  const card = createCard({ cardholderName: `${firstName} ${lastName}` });
  const headers = {
    Authorization: `Bearer ${shopperWithCart.token}`,
    'X-Shop-Cart': shopperWithCart.cartId,
  };

  const cartResponse = await request.get('/api/shop/cart?delivery=standard', { headers });
  await expect(cartResponse, 'Reading the test cart failed').toBeOK();
  const cart = (await cartResponse.json()) as { totalCents: number };

  let orderId: string | undefined;
  try {
    const created = await request.post('/api/shop/orders', {
      headers,
      data: {
        email,
        address: {
          fullName: `${firstName} ${lastName}`,
          street: address.street,
          city: address.city,
          postcode: address.postalCode,
          country: address.country,
        },
        delivery: 'standard',
        card: {
          number: card.number,
          expiry: `${card.expiryMonth}/${card.expiryYear.slice(-2)}`,
          cvc: card.cvv,
          name: card.cardholderName,
        },
      },
    });

    if (created.status() === 201) {
      const order = (await created.json()) as CreatedOrder;
      orderId = order.id;
      expect(order).toMatchObject({
        id: expect.stringMatching(/^QE-/),
        email,
        status: 'Processing',
        totalCents: cart.totalCents,
      });
    }

    expect(created.status(), 'Creating the order failed').toBe(201);
  } finally {
    if (orderId) {
      const cleanup = await request.post(
        `/api/shop/orders/${encodeURIComponent(orderId)}/cancel`,
        { headers },
      );
      await expect(cleanup, 'Cancelling the test order failed').toBeOK();
    }
  }
});
