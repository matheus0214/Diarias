import { container } from 'tsyringe';

import IHash from './PasswordHash/model/IHash';
import BCryptHashProvider from './PasswordHash/implementations/BCryptHashProvider';

import ISignSession from './SignSession/model/ISignSession';
import SignJWT from './SignSession/implementations/SignJWT';

container.registerSingleton<IHash>('HashPassword', BCryptHashProvider);

container.registerSingleton<ISignSession>('SignSession', SignJWT);
