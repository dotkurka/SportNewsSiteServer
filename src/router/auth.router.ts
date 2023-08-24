import express from 'express';

import { validationAuthSchema } from 'config/validationAuthSchema.js';
import { authController } from 'controllers/index.js';
import { authMiddleware, roleMiddelware } from 'middlewares/index.js';
import { userRoles } from 'constants/index.js';

const authRouter = express.Router();

authRouter.post('/registration', validationAuthSchema, authController.registration);
authRouter.post('/login', authController.login);
authRouter.get('/user', authMiddleware, authController.getUser);
authRouter.get('/users', authMiddleware, roleMiddelware([userRoles.admin]), authController.getUsers);

export default authRouter;
