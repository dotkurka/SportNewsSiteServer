import mongoose from 'mongoose';

export interface IAppFile {
    fieldName: string;
    originalFilename: string;
    path: string;
    headers: object;
    size: number;
    name: string;
    type: string;
}

export interface IFile extends mongoose.Document {
    id: string;
    serverPath: string;
    pathSmall?: string;
    originalName: string;
    name: string;
    size: number;
    path: string;
}
