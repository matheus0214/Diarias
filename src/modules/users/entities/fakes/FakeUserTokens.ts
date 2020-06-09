import { uuid } from 'uuidv4';

import IUserTokens from '../IUserTokens';

class FakeUserTokens implements IUserTokens {
  id: string;

  token: string;

  user_id: string;

  created_at: Date;

  updated_at: Date;

  constructor(user_id: string) {
    this.id = uuid();
    this.token = uuid();
    this.user_id = user_id;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export default FakeUserTokens;
