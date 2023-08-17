import { Types } from 'mongoose';

export interface IUser {
    id: Types.ObjectId;
    roles: string[];
}
