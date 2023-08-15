import express from 'express';

import navigationController from '../controllers/navigationController.js';
import errorHandlingMiddleware from '../middlewares/errorHandlingMiddleware.js';

const apiRouter = express.Router();

apiRouter.get('/navigation', errorHandlingMiddleware, navigationController);

export default apiRouter;
