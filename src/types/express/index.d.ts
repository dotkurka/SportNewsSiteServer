declare namespace Express {
    import { Request } from 'express';
    import { IUser, IFile, IAppFile } from '../../interfaces/index.js';

    interface Request {
        user: IUser;
        uploadedFiles: IFile[];
        files: { file: IAppFile[] };
    }
}
