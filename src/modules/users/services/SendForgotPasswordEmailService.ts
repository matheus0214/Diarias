import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/model/IMailProvider';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokens from '@modules/users/repositories/IUserTokens';

@injectable()
class SendForgotPasswordEmail {
  constructor(
    @inject('Mail')
    private mail: IMailProvider,

    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokens')
    private userTokens: IUserTokens,
  ) {}

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }

    await this.userTokens.generate(user.id);

    await this.mail.sendMail(email, 'Este e um email de teste');
  }
}

export default SendForgotPasswordEmail;
