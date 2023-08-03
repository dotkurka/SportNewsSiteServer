const jwt = require('jsonwebtoken');
const { secret } = require('../config/tokenKey');

const roleMiddelware = (roles) => {
    return function (req, res, next) {
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
            const { roles: userRoles } = jwt.verify(token, secret);
            let hasRole = false;
            userRoles.forEach((role) => {
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

module.exports = roleMiddelware;
