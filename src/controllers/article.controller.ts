import { Request, Response } from 'express';

import { articleService } from '../services/index.js';

class ArticleCotroller {
    async getArticles(req: Request, res: Response) {
        const data = await articleService.getAllArticle();

        return res.send(data);
    }
}

export default new ArticleCotroller();
