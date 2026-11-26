export type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
};

export function createAddress(overrides: Partial<Address> = {}): Address {
  return {
    street: '123 Test Street',
    city: 'Testville',
    state: 'CA',
    postalCode: '90210',
    country: 'US',
    phone: '555-0100',
    ...overrides,
  };
}
