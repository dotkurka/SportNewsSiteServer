import express from 'express';

import { validationAuthSchema } from '../config/validationAuthSchema.js';
import { authController } from '../controllers/index.js';
import { authMiddleware } from '../middlewares/index.js';
import { userRoles } from '../constants/index.js';

const authRouter = express.Router();

authRouter.post('/registration', validationAuthSchema, authController.registration);
authRouter.post('/login', authController.login);
authRouter.get('/user', authMiddleware.verifyToken, authController.getUser);
authRouter.get(
    '/users',
    authMiddleware.verifyToken,
    authMiddleware.verifyRole([userRoles.admin]),
    authController.getUsers
);

export default authRouter;
