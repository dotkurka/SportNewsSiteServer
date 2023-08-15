import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

import User from '../models/user.js';
import generateAccessToken from '../services/generateAccessToken.js';

const loginUser = async (req: Request, res: Response) => {
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
};

export default loginUser;
