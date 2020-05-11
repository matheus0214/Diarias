import { Router } from 'express';

import CreateSessionService from '../services/CreateSessionService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSessionService = new CreateSessionService();

  const user = await createSessionService.execute({ email, password });

  return response.json(user);
});

export default sessionRouter;
