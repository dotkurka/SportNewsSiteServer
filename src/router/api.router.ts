import express from 'express';

import { navigationController } from 'controllers/index.js';

const apiRouter = express.Router();

apiRouter.get('/navigation', navigationController);

export default apiRouter;
