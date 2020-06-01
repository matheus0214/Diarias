import AppError from '@shared/errors/AppError';
import FakeBCryptHashProvider from '@modules/users/providers/PasswordHash/fakes/FakeBCryptHashProvider';
import SignJWT from '@modules/users/providers/SignSession/implementations/SignJWT';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import CreateSessionService from './CreateSessionService';

describe('CreateUserService', () => {
  it('should be able to create a new session', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBCryptHash = new FakeBCryptHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeBCryptHash,
    );
    const signSession = new SignJWT();
    const createSessionService = new CreateSessionService(
      fakeUsersRepository,
      fakeBCryptHash,
      signSession,
    );

    const user = await createUserService.execute({
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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBCryptHash = new FakeBCryptHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeBCryptHash,
    );
    const signSession = new SignJWT();
    const createSessionService = new CreateSessionService(
      fakeUsersRepository,
      fakeBCryptHash,
      signSession,
    );

    await createUserService.execute({
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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeBCryptHash = new FakeBCryptHashProvider();
    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeBCryptHash,
    );
    const signSession = new SignJWT();
    const createSessionService = new CreateSessionService(
      fakeUsersRepository,
      fakeBCryptHash,
      signSession,
    );

    await createUserService.execute({
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
