import { sign } from 'jsonwebtoken';

import authOptions from '@config/authConfig';

import ISignSession from '../model/ISignSession';

class SignJWT implements ISignSession {
  public sign(payload: string | object, subject: string): string {
    return sign(payload, authOptions.jwt.secret, {
      expiresIn: authOptions.jwt.expiresIn,
      subject,
    });
  }
}

export default SignJWT;
