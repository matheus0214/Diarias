import { uuid } from 'uuidv4';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/intities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((currentUser) => currentUser.email === email);

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, password });

    this.users.push(user);

    return user;
  }

  public async findByID(id: string): Promise<User | undefined> {
    const user = this.users.find((currentUser) => currentUser.id === id);

    return user;
  }

  public async save(user: User): Promise<User> {
    const index = this.users.findIndex((user_find) => user_find.id === user.id);

    if (index >= 0) {
      this.users[index] = user;
    }

    return user;
  }
}

export default FakeUsersRepository;
