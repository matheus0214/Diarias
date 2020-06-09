import { uuid } from 'uuidv4';

import IUser from '../IUser';

class FakeUser implements IUser {
  id: string;

  name: string;

  email: string;

  password: string;

  avatar: string;

  created_at: Date;

  updated_at: Date;

  constructor(name: string, email: string, password: string) {
    this.id = uuid();
    this.name = name;
    this.email = email;
    this.password = password;
    this.avatar = '';
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}

export default FakeUser;
