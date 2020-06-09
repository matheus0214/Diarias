import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/model/IMailProvider';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

@injectable()
class SendForgotPasswordEmail {
  constructor(
    @inject('Mail')
    private mail: IMailProvider,

    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokens')
    private userTokens: IUserTokensRepository,
  ) {}

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist');
    }

    const token = await this.userTokens.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      from: {
        name: user.name,
        email: user.email,
      },
      subject: 'Recuperação de senha',
      template: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password/token&=${token.token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmail;
