import express from 'express';

import { fileFormats } from '../constants/index.js';
import { articleController } from '../controllers/index.js';
import { fileUploadMiddleware, validationMiddleware } from '../middlewares/index.js';
import validationArticleSchema from '../validation/article.schema.js';

const articleRouter = express.Router();

articleRouter.get('/', articleController.getArticleByQueryParams);
articleRouter.post(
    '/',
    validationMiddleware(validationArticleSchema),
    fileUploadMiddleware.uploadFiles([fileFormats.jpeg, fileFormats.jpg, fileFormats.png], true),
    articleController.createArticle
);
articleRouter.get('/:pathArticle', articleController.getArticleByParams);
// articleRouter.delete('/', articleController.getArticles);
// articleRouter.patch('/', articleController.getArticles);

export default articleRouter;
