import IUserToken from '@modules/users/entities/IUserTokens';
import FakeUserToken from '@modules/users/entities/fakes/FakeUserTokens';
import IUserTokens from '../IUserTokens';

class FakeUserTokensRepository implements IUserTokens {
  private tokens: IUserToken[] = [];

  public async generate(user_id: string): Promise<IUserToken> {
    const token = new FakeUserToken(user_id);

    this.tokens.push(token);

    return token;
  }
}

export default FakeUserTokensRepository;
