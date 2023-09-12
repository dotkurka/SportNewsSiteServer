import Joi from 'joi';
import { fileFormats } from '../constants/index.js';

const fileUploadSchema = Joi.object({
    file: Joi.object({
        fieldName: Joi.string().required(),
        originalFilename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().required(),
        name: Joi.string().required(),
        type: Joi.string().valid(fileFormats.jpeg, fileFormats.jpg, fileFormats.png).required(),
    }),
});

export default fileUploadSchema;
