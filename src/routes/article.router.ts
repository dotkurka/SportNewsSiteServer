import express from 'express';

import { fileFormats } from '../constants/index.js';
import { articleController } from '../controllers/index.js';
import { fileUploadMiddleware, validationMiddleware } from '../middlewares/index.js';
import validationArticleSchema from '../validation/article.schema.js';

const articleRouter = express.Router();

articleRouter.get('/', articleController.getArticles);
articleRouter.post(
    '/',
    validationMiddleware(validationArticleSchema.createSchema),
    articleController.createArticle
);
articleRouter.get('/:pathArticle', articleController.getArticleByParams);
articleRouter.patch(
    '/:pathArticle',
    validationMiddleware(validationArticleSchema.updateSchema),
    articleController.updateArticle
);
articleRouter.delete('/:pathArticle', articleController.removeArticle);

export default articleRouter;
