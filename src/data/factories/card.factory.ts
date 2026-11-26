export type Card = {
  cardholderName: string;
  number: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
};

export function createCard(overrides: Partial<Card> = {}): Card {
  return {
    cardholderName: 'Test User',
    number: '4242424242424242',
    expiryMonth: '12',
    expiryYear: '2030',
    cvv: '123',
    ...overrides,
  };
}
