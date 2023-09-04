import Joi from 'joi';
import { passwordRegex } from '../constants/index.js';

const validationAuthSchema = Joi.object({
    firstName: Joi.string().min(2).max(15).required(),
    lastName: Joi.string().min(2).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(new RegExp(passwordRegex)).required(),
});

export default validationAuthSchema;
