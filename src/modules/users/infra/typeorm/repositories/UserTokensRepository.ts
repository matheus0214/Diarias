import { EntityRepository, Repository, getRepository } from 'typeorm';

import IUserTokens from '@modules/users/repositories/IUserTokens';
import UserTokens from '../entities/UserTokens';

@EntityRepository(UserTokens)
class UserTokensRepository implements IUserTokens {
  private ormRepository: Repository<UserTokens>;

  constructor() {
    this.ormRepository = getRepository(UserTokens);
  }

  public async generate(user_id: string): Promise<UserTokens> {
    const token = this.ormRepository.create({ user_id });

    await this.ormRepository.save(token);

    return token;
  }
}

export default UserTokensRepository;
