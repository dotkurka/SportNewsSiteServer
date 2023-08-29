import { Request } from 'express';
import type { IUser } from '../user.types.js';

export {};

declare global {
    namespace Express {
        export interface Request {
            user: IUser;
        }
    }
}
