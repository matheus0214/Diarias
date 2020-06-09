import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUser from '@modules/users/entities/IUser';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHash from '@modules/users/providers/PasswordHash/model/IHash';
import ISignSession from '@modules/users/providers/SignSession/model/ISignSession';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('Hash')
    private hash: IHash,

    @inject('SignSession')
    private signSession: ISignSession,
  ) {}

  public async execute({
    email,
    password,
  }: IRequest): Promise<{ user: IUser; token: string }> {
    /** Check user exist */
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Combination email/password does not match');
    }

    /** Check password is correct */
    const checkPassword = await this.hash.compare(password, user.password);

    if (!checkPassword) {
      throw new AppError('Combination email/password does not match');
    }

    delete user.password;

    const token = this.signSession.sign({}, user.id);

    return { user, token };
  }
}

export default CreateSessionService;
