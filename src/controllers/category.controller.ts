import { Request, Response } from 'express';

import { categoryService } from '../services/index.js';
import PropagateError from '../decorators/PropagateError.decorator.js';

// In process...

@PropagateError
class CategoryCotroller {
    async getCategory(req: Request, res: Response) {
        const categories = await categoryService.getAllCategory();

        return res.json(categories);
    }

    async getOneCategory(req: Request, res: Response) {
        const params = req.params.category;
        const category = categoryService.getOneByParams(params);

        return res.json(category);
    }
}

export default new CategoryCotroller();
