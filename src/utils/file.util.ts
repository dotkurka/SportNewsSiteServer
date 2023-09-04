import * as fs from 'fs';
import uniqid from 'uniqid';

import { fileMetadata, messageConstants } from '../constants/index.js';
import { IAppFile } from '../interfaces/index.js';
import ApiError from '../responses/ApiError.handler.js';

const validateFormat = (
    files: IAppFile[],
    formats: string[],
    size: number = fileMetadata.maxFileSize
): void => {
    if (files.length > fileMetadata.maxFileCount) {
        throw new ApiError(400, `Too many files. Maximum ${fileMetadata.maxFileCount} files`);
    }

    files.forEach((file) => {
        if (!(formats.indexOf(file.type) + 1) || Math.trunc(file.size / 1000) > size) {
            throw new ApiError(400, messageConstants.invalidSize);
        }
    });
};

const saveFile = async (files: IAppFile[]) => {
    const paths: object[] = [];
    if (!fs.existsSync(fileMetadata.uploadingPath)) {
        fs.mkdirSync(fileMetadata.uploadingPath);
    }
    files.forEach((file) => {
        const fileName = `${uniqid() + fileMetadata.medium.name}.${file.originalFilename
            .split('.')
            .pop()}`;
        const serverPath = `${fileMetadata.uploadingPath}${fileName}`;
        fs.copyFileSync(file.path, serverPath);
        const object = {
            serverPath: serverPath,
            originalName: file.originalFilename,
            name: fileName,
            size: file.size,
            path: `${process.env.BACKEND_HOST_NAME}${fileMetadata.path}${fileName}`,
        };
        paths.push(object);
    });

    return paths;
};

const removeFiles = (files: string[]) => {
    files.forEach((file) => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    });
};

export default {
    validateFormat,
    saveFile,
    removeFiles,
};
