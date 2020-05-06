import { getRepository } from 'typeorm';

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

    const userExist = await usersRepository.findOne({ where: { email } });

    if (userExist) {
      throw new AppError('Email already in use', 401);
    }

    const user = usersRepository.create({ name, email, password });

    return user;
  }
}

export default CreateUserService;
