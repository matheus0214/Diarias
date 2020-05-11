import { Router } from 'express';

import usersRouter from './users.routes';
import sessionRouter from './sessions.routes';

const routes = Router();

routes.use('/session', sessionRouter);
routes.use('/users', usersRouter);

export default routes;
