import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/PasswordHash/model/IHash';

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserTokens')
    private userTokens: IUserTokensRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('Hash')
    private hash: IHashProvider,
  ) {}

  public async execute(token: string, password: string): Promise<void> {
    const tokenCurent = await this.userTokens.findByToken(token);

    if (!tokenCurent) {
      throw new AppError('Token does not exist');
    }

    const user = await this.usersRepository.findByID(tokenCurent.user_id);

    if (!user) {
      throw new AppError('User does not exist');
    }

    if (isAfter(Date.now(), addHours(tokenCurent.created_at, 2))) {
      throw new AppError('Token was expired');
    }

    user.password = await this.hash.hash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
