import { check } from 'express-validator';

export const validationAuthSchema = [
    check('firstName', 'First name cannot be empty').notEmpty().isLength({ max: 15, min: 2 }),
    check('lastName', 'Last name cannot be empty').notEmpty().isLength({ max: 15, min: 2 }),
    check('password', 'Password must be at least 8 characters').isLength({ min: 8 }),
    check('email', 'Email not valid').isEmail(),
];
