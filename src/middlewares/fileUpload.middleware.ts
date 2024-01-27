import { NextFunction, Request, Response } from 'express';
import { messageConstants } from '../constants/index.js';

import ApiError from '../responses/ApiError.handler.js';
import { fileUtil } from '../utils/index.js';

const uploadFiles =
    (formats: string[], isRequired = false, save = true, size?: number) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.files.file && isRequired) {
                throw new ApiError(400, messageConstants.pleaseUploadFile);
            }
            if (req.files && Object.keys(req.files).length !== 0) {
                if (!Array.isArray(req.files.file)) {
                    req.files.file = [req.files.file];
                }
                fileUtil.validateFormat(req.files.file, formats, size);
                if (save) {
                    req.uploadedFiles = await fileUtil.saveFile(req.files.file);
                }
            }
            next();
        } catch (error) {
            console.log(error);

            next(error);
        }
    };

export default {
    uploadFiles,
};
