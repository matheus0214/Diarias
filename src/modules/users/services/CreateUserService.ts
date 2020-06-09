import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUser from '@modules/users/entities/IUser';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHash from '@modules/users/providers/PasswordHash/model/IHash';
import AppError from '@shared/errors/AppError';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('Hash')
    private hash: IHash,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    // Check user exist before create
    const userExist = await this.usersRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('Email already in use');
    }

    const passwordHash = await this.hash.hash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export default CreateUserService;
