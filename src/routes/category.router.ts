import express from 'express';
import { categoryController } from '../controllers/index.js';

const categoryRouter = express.Router();

categoryRouter.get('/', categoryController.getCategory);
categoryRouter.get('/:category', categoryController.getOneCategory);

export default categoryRouter;
