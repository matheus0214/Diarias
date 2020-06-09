import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUser from '@modules/users/entities/IUser';
import FakeUser from '@modules/users/entities/fakes/FakeUser';

class FakeUsersRepository implements IUsersRepository {
  private users: IUser[] = [];

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = this.users.find((currentUser) => currentUser.email === email);

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<IUser> {
    const user = new FakeUser(name, email, password);

    this.users.push(user);

    return user;
  }

  public async findByID(id: string): Promise<IUser | undefined> {
    const user = this.users.find((currentUser) => currentUser.id === id);

    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    const index = this.users.findIndex((user_find) => user_find.id === user.id);

    if (index >= 0) {
      this.users[index] = user;
    }

    return user;
  }
}

export default FakeUsersRepository;
