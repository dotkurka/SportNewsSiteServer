import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { secret } from '../config/tokenKey.js';

const roleMiddelware = (roles: string) => {
    return function (req: Request, res: Response, next: NextFunction) {
        if (req.method === 'OPTIONS') {
            next();
        }

        try {
            let token = req.headers.authorization;
            if (token) {
                token = token.split(' ')[1];
            } else {
                return res.status(403).json({ message: 'User is not authorized' });
            }
            const { roles: userRoles } = jwt.verify(token, secret) as JwtPayload;
            let hasRole = false;
            userRoles.forEach((role: string) => {
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
            res.status(403).json({ message: 'User is not authorized' });
        }
    };
};

export default roleMiddelware;
