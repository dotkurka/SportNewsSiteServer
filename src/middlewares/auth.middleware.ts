import 'dotenv/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { IUser } from '../types/userTypes.js';

const secret: string = process.env.SECRET_KEY || '';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationToken = req.headers.authorization;
        if (authorizationToken !== undefined) {
            const token = authorizationToken.split(' ')[1];
            const user = jwt.verify(token, secret) as JwtPayload;
            if (user) {
                req.user = user as IUser;

                return next();
            }
        }
        res.status(401).json({ message: 'User unauthenticated' });
    } catch (err) {
        res.status(401).json({ message: 'User unauthenticated' });
    }
};

const verifyRole = (roles: string[]) => {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.method === 'OPTIONS') next();

        try {
            const userRoles = req.user?.roles;
            let hasRole = false;
            userRoles?.forEach((role: string) => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if (!hasRole) {
                return res.status(403).json({ message: 'You do not have access' });
            }
            next();
        } catch (err) {
            console.log(err);
            res.status(401).json({ message: 'User unauthenticated' });
        }
    };
};

export default { verifyToken, verifyRole };
