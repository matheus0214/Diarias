import IUser from '@modules/users/entities/IUser';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<IUser | undefined>;
  create(data: ICreateUserDTO): Promise<IUser>;
  findByID(id: string): Promise<IUser | undefined>;
  save(user: IUser): Promise<IUser>;
}
