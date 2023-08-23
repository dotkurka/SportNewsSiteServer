import express from 'express';

import controller from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddelware from '../middlewares/roleMiddelware.js';
import { validationAuthSchema } from '../config/validationAuthSchema.js';
import { Roles } from '../models/role.js';

const authRouter = express.Router();

authRouter.post('/registration', validationAuthSchema, controller.registration);
authRouter.post('/login', controller.login);
authRouter.get('/user', authMiddleware, controller.getUser);
authRouter.get(
    '/users',

    authMiddleware,
    roleMiddelware([Roles.Admin]),
    controller.getUsers
);

export default authRouter;
