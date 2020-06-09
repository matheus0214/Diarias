import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IMailProvider from '@shared/container/providers/MailProvider/model/IMailProvider';
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider';

import ITemplateMailProvider from '@shared/container/providers/TemplateMailProvider/models/ITemplateMailProvider';
import HandlebarsTemplateMailProvider from '@shared/container/providers/TemplateMailProvider/implementations/HandlebarsTemplateMailProvider';

import DiskStorageProvider from '@shared/container/providers/UploadProvider/implementations/DiskStorageProvider';
import IUploadProvider from '@shared/container/providers/UploadProvider/model/IUploadProvider';

container.registerSingleton<IUploadProvider>('Upload', DiskStorageProvider);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokens',
  UserTokensRepository,
);

container.registerSingleton<ITemplateMailProvider>(
  'TemplateMail',
  HandlebarsTemplateMailProvider,
);

container.registerInstance<IMailProvider>(
  'Mail',
  container.resolve(EtherealMailProvider),
);
