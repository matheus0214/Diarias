import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import AppError from '../errors/AppError';

import authConfig from '../config/authConfig';

interface Request {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({
    email,
    password,
  }: Request): Promise<{ user: User; token: string }> {
    /** Check user exist */
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Combination email/password does not match');
    }

    /** Check password is correct */
    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new AppError('Combination email/password does not match');
    }

    delete user.password;

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionService;
