import express from 'express';
import { articleController } from '../controllers/index.js';

const articleRouter = express.Router();

articleRouter.get('/', articleController.getArticles);
// articleRouter.get('/:id', articleController.getArticles);
// articleRouter.post('/', articleController.getArticles);
// articleRouter.delete('/', articleController.getArticles);
// articleRouter.patch('/', articleController.getArticles);

export default articleRouter;
