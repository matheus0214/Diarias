import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/PasswordHash/fakes/FakeHashProvider';
import SignJWT from '@modules/users/providers/SignSession/implementations/SignJWT';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateSessionService from './CreateSessionService';

let fakeUsersRepository: FakeUsersRepository;
let signSession: SignJWT;
let createSessionService: CreateSessionService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    signSession = new SignJWT();
    fakeHashProvider = new FakeHashProvider();
    createSessionService = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
      signSession,
    );
  });

  it('should be able to create a new session', async () => {
    const user = await fakeUsersRepository.create({
      email: 'mathesugiga123@gmail.com',
      name: 'Matheus',
      password: '1234',
    });

    const session = await createSessionService.execute({
      email: 'mathesugiga123@gmail.com',
      password: '1234',
    });

    expect(session).toHaveProperty('token');
    expect(session.user).toBe(user);
  });

  it('should not be able to create a new session, wrong email', async () => {
    await fakeUsersRepository.create({
      email: 'mathesugiga123@gmail.com',
      name: 'Matheus',
      password: '1234',
    });

    try {
      await createSessionService.execute({
        email: 'pedro123@gmail.com',
        password: '1234',
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });

  it('should not be able to create a new session, wrong password', async () => {
    await fakeUsersRepository.create({
      email: 'mathesugiga123@gmail.com',
      name: 'Matheus',
      password: '1234',
    });

    try {
      await createSessionService.execute({
        email: 'mathesugiga123@gmail.com',
        password: '1234567',
      });
    } catch (err) {
      expect(err).toBeInstanceOf(AppError);
    }
  });
});
