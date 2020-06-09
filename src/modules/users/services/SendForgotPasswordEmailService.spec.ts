import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeMailProvider: FakeMailProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeMailProvider,
      fakeUsersRepository,
      fakeUserTokensRepository,
    );
  });

  it('should be able to send email to recover password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Jon Doe',
      email: 'jondoe@gmail.com',
      password: '12345',
    });

    await sendForgotPasswordEmailService.execute('jondoe@gmail.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send email to user does not exist', async () => {
    await expect(
      sendForgotPasswordEmailService.execute('matheusgiga123@gmail.com'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be create token when email was send', async () => {
    const generate = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Jon Doe',
      email: 'jondoe@gmail.com',
      password: '12345',
    });

    await sendForgotPasswordEmailService.execute('jondoe@gmail.com');

    expect(generate).toBeCalledWith(user.id);
  });
});
