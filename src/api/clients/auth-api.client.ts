import type { User } from '../../data/factories/user.factory';
import { BaseApiClient } from './base-api.client';

export class AuthApiClient extends BaseApiClient {
  register(user: User) {
    return this.post('/api/shop/register', {
      data: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        password: user.password,
      },
    });
  }

  login(email: string, password: string) {
    return this.post('/api/shop/login', { data: { email, password } });
  }

  getAccount(token: string) {
    return this.get('/api/shop/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
