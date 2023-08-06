import express from 'express';
import { check } from 'express-validator';

import controller from '../controllers/authController.js';
import roleMiddelware from '../middlewares/roleMiddelware.js';

const router = express.Router();

router.post(
    '/registration',
    [
        check('firstName', 'First name cannot be empty').notEmpty().isLength({ max: 15, min: 2 }),
        check('lastName', 'Last name cannot be empty').notEmpty().isLength({ max: 15, min: 2 }),
        check('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
        check('email', 'Email not valid').isEmail(),
    ],
    controller.registration
);
router.post('/login', controller.login);
router.get('/user', controller.getUser);
router.get('/users', roleMiddelware, controller.getUsers);

export default router;
