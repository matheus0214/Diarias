import { EntityRepository, Repository, getRepository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokens from '../entities/UserTokens';

@EntityRepository(UserTokens)
class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserTokens>;

  constructor() {
    this.ormRepository = getRepository(UserTokens);
  }

  public async generate(user_id: string): Promise<UserTokens> {
    const token = this.ormRepository.create({ user_id });

    await this.ormRepository.save(token);

    return token;
  }

  public async findByToken(token: string): Promise<UserTokens | undefined> {
    const findToken = await this.ormRepository.findOne({
      where: { token },
    });

    return findToken;
  }
}

export default UserTokensRepository;
