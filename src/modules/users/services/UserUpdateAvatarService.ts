import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/intities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IUploadProvider from '@shared/container/providers/UploadProvider/model/IUploadProvider';

interface IRequest {
  id: string;
  filename: string;
}

@injectable()
class UserUpdateAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('Upload')
    private upload: IUploadProvider,
  ) {}

  async execute({ id, filename }: IRequest): Promise<User> {
    /** Check user is a valid user */
    const user = await this.usersRepository.findByID(id);

    if (!user) {
      throw new AppError('User does not found');
    }

    /** Check avatar exist */
    if (user.avatar) {
      await this.upload.deleteFile(user.avatar);
    }

    const filenameAvatar = await this.upload.saveFile(filename);

    user.avatar = filenameAvatar;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UserUpdateAvatarService;
