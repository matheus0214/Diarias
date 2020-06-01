import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import 'reflect-metadata';

import '@shared/container';
import AppError from '@shared/errors/AppError';
import routes from './routes';
import '@shared/infra/typeorm';

const app = express();
app.use(cors());
// Provider app to recive json objects
app.use(express.json());

app.use(routes);

// Handle errors
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333);
