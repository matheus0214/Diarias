import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/PasswordHash/fakes/FakeHashProvider';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    resetPasswordService = new ResetPasswordService(
      fakeUserTokensRepository,
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'mathesugiga123@gmail.com',
      name: 'Matheus',
      password: '1234',
    });

    const token = await fakeUserTokensRepository.generate(user.id);

    await resetPasswordService.execute(token.token, '987');

    const updatedUser = await fakeUsersRepository.findByEmail(
      'mathesugiga123@gmail.com',
    );

    expect(updatedUser?.password).toBe('987');
  });

  it('should be able to reset password', async () => {
    await fakeUsersRepository.create({
      email: 'mathesugiga123@gmail.com',
      name: 'Matheus',
      password: '1234',
    });

    await expect(
      resetPasswordService.execute('does not exist token', '987'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password with token more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      email: 'mathesugiga123@gmail.com',
      name: 'Matheus',
      password: '1234',
    });

    const token = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const date = new Date();

      return date.setHours(date.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute(token.token, '987'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be crypt new password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'mathesugiga123@gmail.com',
      name: 'Matheus',
      password: '1234',
    });

    const token = await fakeUserTokensRepository.generate(user.id);

    const crypt = jest.spyOn(fakeHashProvider, 'hash');

    await resetPasswordService.execute(token.token, '987');

    expect(crypt).toBeCalled();
  });
});
