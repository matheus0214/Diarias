import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokens from '@modules/users/repositories/IUserTokens';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IMailProvider from '@shared/container/providers/MailProvider/model/IMailProvider';
import MailProvider from '@shared/container/providers/MailProvider/implementations/MailProvider';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokens>('UserTokens', UserTokensRepository);

container.registerSingleton<IMailProvider>('Mail', MailProvider);
