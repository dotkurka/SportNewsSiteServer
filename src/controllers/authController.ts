import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { Request, Response } from 'express';

import User from '../models/user.js';
import Role, { Roles } from '../models/role.js';
import generateAccessToken from '../services/generateAccessToken.js';

class authController {
    async registration(req: Request, res: Response) {
        const erorrs = validationResult(req);
        if (!erorrs.isEmpty()) {
            return res.status(400).json({ message: 'Registartion erorr', erorrs });
        }
        const { firstName, lastName, password, email } = req.body;
        const candidate = await User.findOne({ email });
        if (candidate) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({ value: Roles.User });
        const user = new User({
            firstName,
            lastName,
            password: hashPassword,
            email,
            roles: [userRole?.value],
        });
        await user.save();
        const currentUser = await User.findOne({ email });
        const token = currentUser ? generateAccessToken(currentUser._id, currentUser.roles) : null;
        return res.json({ token });
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'No such user exists' });
        }
        const validPassword = bcrypt.compareSync(password, user.password as string);
        if (!validPassword) {
            return res.status(400).json({ message: 'Email or Password incorrect' });
        }
        const token = generateAccessToken(user._id, user.roles);
        return res.json({ token });
    }

    async getUser(req: Request, res: Response) {
        const user = req.user;
        return res.json(user);
    }

    async getUsers(req: Request, res: Response) {
        const users = await User.find();
        res.json(users);
    }
}

export default new authController();
