import express from 'express';

import { validationAuthSchema } from '../config/validationAuthSchema.js';
import controller from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import errorHandlingMiddleware from '../middlewares/errorHandlingMiddleware.js';
import roleMiddelware from '../middlewares/roleMiddelware.js';
import { Roles } from '../models/role.js';

const router = express.Router();

router.post('/registration', errorHandlingMiddleware, validationAuthSchema, controller.registration);
router.post('/login', errorHandlingMiddleware, controller.login);
router.get('/user', errorHandlingMiddleware, authMiddleware, controller.getUser);
router.get(
    '/users',
    errorHandlingMiddleware,
    authMiddleware,
    roleMiddelware([Roles.Admin]),
    controller.getUsers
);

export default router;
