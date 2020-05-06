import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();

  const user = createUserService.execute({ name, email, password });

  return response.json(user);
});

export default usersRouter;
