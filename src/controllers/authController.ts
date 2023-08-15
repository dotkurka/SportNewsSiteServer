import { Request, Response } from 'express';

import registrationUser from '../services/registrationUser.js';
import loginUser from '../services/loginUser.js';
import getAllUsers from '../services/getAllUsers.js';

class AuthController {
    registration(req: Request, res: Response) {
        registrationUser(req, res);
    }

    login(req: Request, res: Response) {
        loginUser(req, res);
    }

    getUser(req: Request, res: Response) {
        const user = req.user;
        return res.json(user);
    }

    async getUsers(req: Request, res: Response) {
        const users = await getAllUsers();
        return res.json(users);
    }
}

export default new AuthController();
