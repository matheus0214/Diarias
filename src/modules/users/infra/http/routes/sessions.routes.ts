import { Router } from 'express';
import { container } from 'tsyringe';

import CreateSessionService from '@modules/users/services/CreateSessionService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSessionService = container.resolve(CreateSessionService);

  const user = await createSessionService.execute({ email, password });

  return response.json(user);
});

export default sessionRouter;
