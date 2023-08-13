import { Types } from 'mongoose';

export interface IUser {
    _id: Types.ObjectId;
    firstName: string | undefined;
    lastName: string | undefined;
    password: string | undefined;
    email: string | undefined;
    roles: string[];
}
