export function getShopAccounts() {
  const email = process.env.SHOP_EMAIL;
  const lockedEmail = process.env.SHOP_LOCKED_EMAIL;
  const password = process.env.SHOP_PASSWORD;
  if (!email || !lockedEmail || !password) {
    throw new Error('Set SHOP_EMAIL, SHOP_LOCKED_EMAIL and SHOP_PASSWORD for shop login tests.');
  }

  return { email, lockedEmail, password };
}
