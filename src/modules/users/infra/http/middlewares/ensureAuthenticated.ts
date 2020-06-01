import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import authConfig from '@config/authConfig';

interface Token {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const header = request.headers.authorization;

  if (!header) {
    throw new AppError('Token not provider', 401);
  }

  const [, token] = header.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as Token;

    request.user = { id: sub };

    return next();
  } catch (err) {
    throw new AppError('Invalid token', 401);
  }
}
