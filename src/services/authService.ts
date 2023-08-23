import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Result, ValidationError } from 'express-validator';
import { Types } from 'mongoose';

import User from '../models/user.js';
import Role, { Roles } from '../models/role.js';
import { ApiError } from '../error/ApiError.js';
import { IRequestBody } from '../types/userTypes.js';
import { resolve } from 'path';

const secret: string = process.env.SECRET_KEY || '';

const generateAccessToken = (id: Types.ObjectId, roles: string[]) => {
    const payload = {
        id,
        roles,
    };
    return jwt.sign(payload, secret, { expiresIn: '120000ms' });
};

export const registrationUser = async (user: IRequestBody, erorrs: Result<ValidationError>) => {
    if (!erorrs.isEmpty()) {
        throw new ApiError(400, 'Registartion erorr');
    }
    const { firstName, lastName, password, email } = user;
    const candidate = await User.findOne({ email });
    if (candidate) {
        throw new ApiError(400, 'User already exists');
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const userRole = await Role.findOne({ value: Roles.User });
    const newUser = new User({
        firstName,
        lastName,
        password: hashPassword,
        email,
        roles: [userRole?.value],
    });
    await newUser.save();
    const currentUser = await User.findOne({ email });
    const token = currentUser ? generateAccessToken(currentUser._id, currentUser.roles) : null;
    return { token };
};

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, 'No such user exists');
    }
    const validPassword = bcrypt.compareSync(password, user.password as string);
    if (!validPassword) {
        throw new ApiError(400, 'Email or Password incorrect');
    }
    const token = generateAccessToken(user._id, user.roles);
    return { token };
};

export const getUserById = async (id: Types.ObjectId) => {
    const user = await User.findById(id);

    if (!user) {
        throw new ApiError(401, 'User unauthenticate');
    }

    return user;
};

export const getAllUsers = async () => {
    const users = await User.find();

    return users;
};
