import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';

import { tokenGenerate } from '../utils/index.js';
import { RoleModel, UserModel } from '../models/index.js';
import { messageConstants, userRoles } from '../constants/index.js';
import ApiError from '../responses/ApiError.handler.js';
import { IRequestBody } from '../interfaces/index.js';

const registrationUser = async (user: IRequestBody) => {
    const { firstName, lastName, password, email } = user;
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
        throw new ApiError(400, messageConstants.userAlreadyExist);
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
    const currentUser = await newUser.save();
    const token = tokenGenerate(currentUser._id, currentUser.roles);
    return { token };
};

const loginUser = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new ApiError(400, messageConstants.userNotExist);
    }
    const validPassword = bcrypt.compareSync(password, user.password as string);
    if (!validPassword) {
        throw new ApiError(400, messageConstants.incorrectEmailOrPassword);
    }
    const token = tokenGenerate(user._id, user.roles);
    return { token };
};

const getUserById = async (id: Types.ObjectId) => {
    const user = await UserModel.findById(id);
    if (!user) {
        throw new ApiError(401, messageConstants.unauthorized);
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
