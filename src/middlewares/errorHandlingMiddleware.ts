import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../erorr/ApiError.js';

const errorHandlingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        next();
    } catch (erorr) {
        console.log(erorr);

        if (erorr instanceof ApiError) {
            return res.status(erorr.status).json({ message: erorr.message });
        }
        return res.status(500).json({ message: 'Unexpected error' });
    }
};

export default errorHandlingMiddleware;
