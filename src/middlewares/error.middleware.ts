import { Request, Response, NextFunction } from 'express';
import { messageConstants } from '../constants/index.js';
import ApiError from '../responses/ApiError.handler.js';

const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ApiError) {
        return res.status(error.status).json({ message: error.message });
    }
    return res.status(500).json({ message: messageConstants.somethingWentWrong });
};

export default errorMiddleware;
