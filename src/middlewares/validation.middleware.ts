import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

import ApiError from '../responses/ApiError.handler.js';

const validationMiddleware = (velidationSchema: joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = velidationSchema.validate(req.body, { abortEarly: false });

        if (error) {
            throw new ApiError(400, error.details[0].message.replace(/[\\"]/g, ''));
        }
        next();
    };
};

export default validationMiddleware;
