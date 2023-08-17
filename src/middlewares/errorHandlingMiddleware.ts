import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../erorr/ApiError.js';

const errorHandlingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        next();
    } catch (err) {
        if (err instanceof ApiError) {
            return res.status(err.status).json({ message: err.message });
        }
        return res.status(500).json({ message: 'Unexpected error' });
    }
};

export default errorHandlingMiddleware;
