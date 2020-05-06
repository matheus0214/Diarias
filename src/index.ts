import express, { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';

import routes from './routes';
import AppError from './errors/AppError';
import './database';

const app = express();

app.use(routes);

// Handle errors
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333);
