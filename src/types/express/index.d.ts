import { Request } from 'express';
import type { IUser } from '../userTypes.js';

export {};

declare global {
    namespace Express {
        export interface Request {
            user?: IUser;
        }
    }
}
