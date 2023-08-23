import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { getAllUsers, getUserById, loginUser, registrationUser } from '../services/authService.js';
import { IRequestBody } from '../types/userTypes.js';

class AuthController {
    async registration(req: Request, res: Response) {
        const user = <IRequestBody>req.body;
        const erorrs = validationResult(req);
        const token = await registrationUser(user, erorrs);
        return res.json(token);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        return res.json(token);
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
