import User from '@modules/users/infra/typeorm/intities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  findByID(id: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
