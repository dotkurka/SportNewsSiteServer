import { Request, Response } from 'express';

import PropagateError from '../decorators/PropagateError.decorator.js';
import { authService } from '../services/index.js';
import BaseController from '../controllers/base.controller.js';
import { IRequestBody } from '../interfaces/index.js';

@PropagateError
class AuthController extends BaseController {
    async registration(req: Request, res: Response) {
        const user = <IRequestBody>req.body;
        const token = await authService.registrationUser(user);
        return res.json(token);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const token = await authService.loginUser(email, password);
        return res.json(token);
    }

    async getUser(req: Request, res: Response) {
        const user = await authService.getUserById(req.user.id);
        return res.json(user);
    }

    async getUsers(req: Request, res: Response) {
        const users = await authService.getAllUsers();
        return res.json(users);
    }
}

export default new AuthController();
