import express from 'express';

import { validationAuthSchema } from '../config/validationAuthSchema.js';
import controller from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import errorHandlingMiddleware from '../middlewares/errorHandlingMiddleware.js';
import roleMiddelware from '../middlewares/roleMiddelware.js';
import { Roles } from '../models/role.js';

const authRouter = express.Router();

authRouter.post('/registration', errorHandlingMiddleware, validationAuthSchema, controller.registration);
authRouter.post('/login', errorHandlingMiddleware, controller.login);
authRouter.get('/user', errorHandlingMiddleware, authMiddleware, controller.getUser);
authRouter.get(
    '/users',
    errorHandlingMiddleware,
    authMiddleware,
    roleMiddelware([Roles.Admin]),
    controller.getUsers
);

export default authRouter;
