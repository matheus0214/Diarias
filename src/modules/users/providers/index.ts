import { container } from 'tsyringe';

import IHash from './PasswordHash/model/IHash';
import BCryptHashProvider from './PasswordHash/modules/BCryptHashProvider';

import ISignSession from './SignSession/model/ISignSession';
import SignJWT from './SignSession/modules/SignJWT';

container.registerSingleton<IHash>('HashPassword', BCryptHashProvider);

container.registerSingleton<ISignSession>('SignSession', SignJWT);
