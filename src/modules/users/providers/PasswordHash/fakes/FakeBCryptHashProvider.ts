import IHash from '../model/IHash';

class FakeBCryptHashProvider implements IHash {
  public async hash(password: string): Promise<string> {
    return password;
  }

  public async compare(password: string, hashed: string): Promise<boolean> {
    return password === hashed;
  }
}

export default FakeBCryptHashProvider;
