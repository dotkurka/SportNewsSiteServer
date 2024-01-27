import express from 'express';

import { authController } from '../controllers/index.js';
import { authMiddleware, validationMiddleware } from '../middlewares/index.js';
import { userRoles } from '../constants/index.js';
import { validationAuthSchema } from '../validation/index.js';

const authRouter = express.Router();

authRouter.post(
    '/registration',
    validationMiddleware(validationAuthSchema),
    authController.registration
);
authRouter.post('/login', authController.login);
authRouter.get('/user', authMiddleware.verifyToken, authController.getUser);
authRouter.get(
    '/users',
    authMiddleware.verifyToken,
    authMiddleware.verifyRole([userRoles.admin]),
    authController.getUsers
);

export default authRouter;
