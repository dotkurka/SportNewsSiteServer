import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { Request, Response } from 'express';

import User from '../models/user.js';
import Role, { Roles } from '../models/role.js';
import generateAccessToken from './generateAccessToken.js';

const registrationUser = async (req: Request, res: Response) => {
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
};

export default registrationUser;
