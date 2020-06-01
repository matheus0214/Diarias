import AppError from '@shared/errors/AppError';
import FakeBCryptHashProvider from '@modules/users/providers/PasswordHash/fakes/FakeBCryptHashProvider';
import FakeDiskStorageProvider from '@shared/container/providers/UploadProvider/fakes/FakeDiskStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import UserUpdateAvatarService from './UserUpdateAvatarService';

describe('CreateUserService', () => {
  it('should be able to upload avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBCryptHash = new FakeBCryptHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeBCryptHash,
    );
    const fakeUploadProvider = new FakeDiskStorageProvider();
    const userUpdateAvatarService = new UserUpdateAvatarService(
      fakeUsersRepository,
      fakeUploadProvider,
    );

    const user = await createUserService.execute({
      email: 'mathesugiga123@gmail.com',
      name: 'Matheus',
      password: '1234',
    });

    const fileAvatar = await userUpdateAvatarService.execute({
      id: user.id,
      filename: 'avatar.png',
    });

    expect(fileAvatar.avatar).toBe('avatar.png');
  });

  it('should not be able update avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const fakeUploadProvider = new FakeDiskStorageProvider();
    const userUpdateAvatarService = new UserUpdateAvatarService(
      fakeUsersRepository,
      fakeUploadProvider,
    );

    expect(
      userUpdateAvatarService.execute({
        id: 'does not exist',
        filename: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete old avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBCryptHash = new FakeBCryptHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeBCryptHash,
    );
    const fakeUploadProvider = new FakeDiskStorageProvider();
    const userUpdateAvatarService = new UserUpdateAvatarService(
      fakeUsersRepository,
      fakeUploadProvider,
    );

    const user = await createUserService.execute({
      email: 'mathesugiga123@gmail.com',
      name: 'Matheus',
      password: '1234',
    });

    const deletedAvatarFunction = jest.spyOn(fakeUploadProvider, 'deleteFile');

    await userUpdateAvatarService.execute({
      id: user.id,
      filename: 'avatar.png',
    });

    await userUpdateAvatarService.execute({
      id: user.id,
      filename: 'avatar2.png',
    });

    expect(deletedAvatarFunction).toBeCalledWith('avatar.png');
  });
});
