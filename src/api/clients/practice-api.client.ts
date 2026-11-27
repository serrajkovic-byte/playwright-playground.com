import type { PracticeUser } from '../../data/factories/user.factory';
import { BaseApiClient } from './base-api.client';

export class PracticeApiClient extends BaseApiClient {
  createUser(user: PracticeUser) {
    return this.post('/api/users', { data: user });
  }

  getUser(id: number) {
    return this.get(`/api/users/${id}`);
  }

  deleteUser(id: number) {
    return this.delete(`/api/users/${id}`);
  }
}
