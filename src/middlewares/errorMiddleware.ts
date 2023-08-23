import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../error/ApiError.js';

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ApiError) {
        return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Unexpected error' });
};

export default errorMiddleware;
