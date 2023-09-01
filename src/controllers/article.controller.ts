import { Request, Response } from 'express';
import { IArticle } from '../interfaces/index.js';

import { articleService } from '../services/index.js';

class ArticleCotroller {
    async getArticles(req: Request, res: Response) {
        const data = await articleService.getAllArticle();

        return res.json(data);
    }

    async createArticle(req: Request, res: Response) {
        const article = <IArticle>req.body;
        const imgPath = req.files.file[0].path as string;
        const user = req.user;
        // Make validation

        const post = articleService.createArticle(article, imgPath, user);
        return res.json(post);
    }
}

export default new ArticleCotroller();
