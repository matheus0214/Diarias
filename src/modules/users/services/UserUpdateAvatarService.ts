import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUser from '@modules/users/entities/IUser';
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

  async execute({ id, filename }: IRequest): Promise<IUser> {
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
