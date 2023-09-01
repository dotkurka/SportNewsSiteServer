import { Request, Response } from 'express';

import { categoryService } from '../services/index.js';

// In process...

class CategoryCotroller {
    async getCategory(req: Request, res: Response) {
        const data = await categoryService.getAllCategory();

        return res.send(data);
    }
}

export default new CategoryCotroller();
