import { Request, Response } from 'express';

import User from '../models/user.js';
import { getAllUsers, getUserById, loginUser, registrationUser } from '../services/authService.js';

class AuthController {
    registration(req: Request, res: Response) {
        registrationUser(req, res);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        return res.json({ token });
    }

    async getUser(req: Request, res: Response) {
        const user = await getUserById(req.user.id);
        return res.json(user);
    }

    async getUsers(req: Request, res: Response) {
        const users = await getAllUsers();
        return res.json(users);
    }
}

export default new AuthController();
