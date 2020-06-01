import { hash, compare } from 'bcryptjs';

import IHash from '../model/IHash';

class BCryptHashProvider implements IHash {
  public async hash(password: string): Promise<string> {
    return hash(password, 8);
  }

  public async compare(password: string, hashed: string): Promise<boolean> {
    return compare(password, hashed);
  }
}

export default BCryptHashProvider;
