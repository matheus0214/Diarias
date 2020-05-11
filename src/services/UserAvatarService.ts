import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';
import AppError from '../errors/AppError';
import uploadConfig from '../config/upload';

interface Request {
  id: string;
  filename: string;
}

class UserAvatarService {
  async execute({ id, filename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    /** Check user is a valid user */
    const user = await usersRepository.findOne(id);

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
    await usersRepository.save(user);

    return user;
  }
}

export default UserAvatarService;
