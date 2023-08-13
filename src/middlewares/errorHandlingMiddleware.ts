import { Request, Response, NextFunction } from 'express';

const errorHandlingMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        next();
    } catch (err) {
        res.status(400).json({ message: err });
    }
};

export default errorHandlingMiddleware;
