import * as fs from 'fs';
import uniqid from 'uniqid';

import { fileMetadata, messageConstants } from '../constants/index.js';
import ApiError from '../responses/ApiError.handler.js';
import { IAppFile } from '../types/file.types.js';

const saveFile = async (files: IAppFile[]) => {
    const paths: object[] = [];
    if (!fs.existsSync(fileMetadata.uploadingPath)) {
        fs.mkdirSync(fileMetadata.uploadingPath);
    }
    for (const file of files) {
        const fileName = `${uniqid() + fileMetadata.medium.name}.${file.originalFilename
            .split('.')
            .pop()}`;
        const serverPath = `${fileMetadata.uploadingPath}${fileName}`;
        fs.copyFileSync(file.path, serverPath);
        const object = {
            server_path: serverPath,
            original_name: file.originalFilename,
            size: file.size,
            path: `${process.env.BACKEND_HOST_NAME}${fileMetadata.path}${fileName}`,
        };
        paths.push(object);
    }

    return paths;
};

const validateFormat = (
    files: IAppFile[],
    formats: string[],
    size: number = fileMetadata.maxFileSize
): void => {
    if (files.length > fileMetadata.maxFileCount) {
        throw new ApiError(400, `Too many files. Maximum ${fileMetadata.maxFileCount} files`);
    }
    for (const file of files) {
        if (!(formats.indexOf(file.type) + 1) || Math.trunc(file.size / 1000) > size) {
            throw new ApiError(400, messageConstants.invalidSize);
        }
    }
};

const removeFiles = (files: string[]) => {
    for (const file of files) {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    }
};

export default {
    validateFormat,
    saveFile,
    removeFiles,
};
