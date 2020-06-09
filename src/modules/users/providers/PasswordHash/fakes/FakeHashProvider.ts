import IHash from '../model/IHash';

class FakeHashProvider implements IHash {
  public async hash(password: string): Promise<string> {
    return password;
  }

  public async compare(password: string, hashed: string): Promise<boolean> {
    return password === hashed;
  }
}

export default FakeHashProvider;
