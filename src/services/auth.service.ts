import bcrypt from 'bcryptjs';
import { Result, ValidationError } from 'express-validator';
import { Types } from 'mongoose';

import { IRequestBody } from 'types/userTypes.js';
import { tokenGenerate } from 'utils/index.js';
import { ApiError, RoleModel, UserModel } from 'models/index.js';
import { userRoles } from 'constants/index.js';

const registrationUser = async (user: IRequestBody, erorrs: Result<ValidationError>) => {
    if (!erorrs.isEmpty()) {
        throw new ApiError(400, 'Registartion erorr');
    }
    const { firstName, lastName, password, email } = user;
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
        throw new ApiError(400, 'User already exists');
    }
    const hashPassword = bcrypt.hashSync(password, 7);
    const userRole = await RoleModel.findOne({ value: userRoles.user });
    const newUser = new UserModel({
        firstName,
        lastName,
        password: hashPassword,
        email,
        roles: [userRole?.value],
    });
    await newUser.save();
    const currentUser = await UserModel.findOne({ email });
    const token = currentUser ? tokenGenerate(currentUser._id, currentUser.roles) : null;
    return { token };
};

const loginUser = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new ApiError(400, 'No such user exists');
    }
    const validPassword = bcrypt.compareSync(password, user.password as string);
    if (!validPassword) {
        throw new ApiError(400, 'Email or Password incorrect');
    }
    const token = tokenGenerate(user._id, user.roles);
    return { token };
};

const getUserById = async (id: Types.ObjectId) => {
    const user = await UserModel.findById(id);

    if (!user) {
        throw new ApiError(401, 'User unauthenticate');
    }

    return user;
};

const getAllUsers = async () => {
    const users = await UserModel.find();

    return users;
};

export default {
    registrationUser,
    loginUser,
    getUserById,
    getAllUsers,
};
