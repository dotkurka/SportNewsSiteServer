import { Request, Response, NextFunction } from 'express';

const roleMiddelware = (roles: string[]) => {
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

export default roleMiddelware;
