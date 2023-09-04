import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import 'dotenv/config';

const secret: string = process.env.SECRET_KEY || '';

const generateAccessToken = (id: Types.ObjectId, roles: string[]) => {
    const payload = {
        id,
        roles,
    };
    return jwt.sign(payload, secret, { expiresIn: '120000ms' });
};

export default generateAccessToken;
