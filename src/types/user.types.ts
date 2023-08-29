import { Types } from 'mongoose';

export interface IUser {
    id: Types.ObjectId;
    roles: string[];
}

export interface IRequestBody {
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    roles: string[];
}
