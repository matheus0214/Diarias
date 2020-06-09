import { isUuid } from 'uuidv4';

import AppError from '@shared/errors/AppError';
import FakeBCryptHashProvider from '@modules/users/providers/PasswordHash/fakes/FakeBCryptHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeBCryptHash: FakeBCryptHashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeBCryptHash = new FakeBCryptHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeBCryptHash,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      email: 'mathesugiga123@gmail.com',
      name: 'Matheus',
      password: '1234',
    });

    expect(user).toHaveProperty('id');
    expect(true).toBe(isUuid(user.id));
  });

  it('should not be able to create more than user per email', async () => {
    await createUserService.execute({
      email: 'mathesugiga123@gmail.com',
      name: 'Matheus',
      password: '1234',
    });

    try {
      await createUserService.execute({
        email: 'mathesugiga123@gmail.com',
        name: 'Matheus',
        password: '1234',
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });
});
