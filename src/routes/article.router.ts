import express from 'express';
import { articleController } from '../controllers/index.js';

const articleRouter = express.Router();

articleRouter.get('/all', articleController.getArticles);

export default articleRouter;
