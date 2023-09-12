import express from 'express';
import { fileFormats } from '../constants/index.js';
import { fileController } from '../controllers/index.js';
import { authMiddleware, fileUploadMiddleware, validationMiddleware } from '../middlewares/index.js';
import { fileUploadSchema } from '../validation/index.js';

const fileRouter = express.Router();

fileRouter.post(
    '/',
    validationMiddleware(fileUploadSchema),
    authMiddleware.verifyToken,
    fileUploadMiddleware.uploadFiles([fileFormats.jpeg, fileFormats.jpg, fileFormats.png], true),
    fileController.getImageFile
);

export default fileRouter;
