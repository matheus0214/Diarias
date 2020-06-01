import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/intities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';

interface IRequest {
  id: string;
  filename: string;
}

@injectable()
class UserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id, filename }: IRequest): Promise<User> {
    /** Check user is a valid user */
    const user = await this.usersRepository.findByID(id);

    if (!user) {
      throw new AppError('User does not found');
    }

    /** Check avatar exist */
    if (user.avatar) {
      const filePath = path.resolve(uploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(filePath);

      if (userAvatarFileExist) {
        fs.promises.unlink(filePath);
      }
    }

    user.avatar = filename;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UserAvatarService;
