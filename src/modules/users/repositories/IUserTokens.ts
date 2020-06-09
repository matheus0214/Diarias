import UserTokens from '@modules/users/entities/IUserTokens';

export default interface IUserTokens {
  generate(user_id: string): Promise<UserTokens>;
}
