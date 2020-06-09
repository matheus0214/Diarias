import AppError from '@shared/errors/AppError';
import FakeDiskStorageProvider from '@shared/container/providers/UploadProvider/fakes/FakeDiskStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UserUpdateAvatarService from './UserUpdateAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUploadProvider: FakeDiskStorageProvider;
let userUpdateAvatarService: UserUpdateAvatarService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUploadProvider = new FakeDiskStorageProvider();
    userUpdateAvatarService = new UserUpdateAvatarService(
      fakeUsersRepository,
      fakeUploadProvider,
    );
  });

  it('should be able to upload avatar', async () => {
    const user = await fakeUsersRepository.create({
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
    await expect(
      userUpdateAvatarService.execute({
        id: 'does not exist',
        filename: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete old avatar', async () => {
    const user = await fakeUsersRepository.create({
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
