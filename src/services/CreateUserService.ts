import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/AppError';

interface CreateUser {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: CreateUser): Promise<User> {
    const usersRepository = getRepository(User);

    // Check user exist before create
    const userExist = await usersRepository.findOne({ where: { email } });

    if (userExist) {
      throw new AppError('Email already in use');
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
