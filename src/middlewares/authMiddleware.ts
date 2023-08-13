import 'dotenv/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../types/userTypes.js';
import User from '../models/user.js';

const secret: string = process.env.SECRET_KEY || '';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationToken = req.headers.authorization;

        if (authorizationToken !== undefined) {
            const token = authorizationToken.split(' ')[1];
            const { id } = jwt.verify(token, secret) as JwtPayload;

            if (id) {
                const user = await User.findById(id);
                req.user = user as IUser;
                return next();
            }
        }
        res.status(401).json({ message: 'User unauthenticated' });
    } catch (err) {
        res.status(401).json({ message: 'User unauthenticated' });
    }
};

export default authMiddleware;
