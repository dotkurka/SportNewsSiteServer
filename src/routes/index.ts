import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import articleRouter from './article.router.js';
import authRouter from './auth.router.js';
import categoryRouter from './category.router.js';

const router = Router();

router.use('/category', categoryRouter);
router.use('/article', authMiddleware.verifyToken, articleRouter);
router.use('/auth', authRouter);

export default router;
