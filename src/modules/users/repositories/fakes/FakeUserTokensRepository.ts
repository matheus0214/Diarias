import IUserTokens from '@modules/users/entities/IUserTokens';
import FakeUserToken from '@modules/users/entities/fakes/FakeUserTokens';
import IUserTokensRepository from '../IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokensRepository {
  private tokens: IUserTokens[] = [];

  public async generate(user_id: string): Promise<IUserTokens> {
    const token = new FakeUserToken(user_id);

    this.tokens.push(token);

    return token;
  }

  public async findByToken(token: string): Promise<IUserTokens | undefined> {
    const tokenFind = this.tokens.find(
      (currentToken) => currentToken.token === token,
    );

    return tokenFind || undefined;
  }
}

export default FakeUserTokensRepository;
