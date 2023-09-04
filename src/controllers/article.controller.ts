import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import PropagateError from '../decorators/PropagateError.decorator.js';
import { IArticle } from '../interfaces/index.js';
import ApiError from '../responses/ApiError.handler.js';

import { articleService } from '../services/index.js';

@PropagateError
class ArticleCotroller {
    async getArticles(req: Request, res: Response) {
        const data = await articleService.getAllArticle();

        return res.json(data);
    }

    async createArticle(req: Request, res: Response) {
        const imgPath = req.uploadedFiles[0].path;
        if (!imgPath) {
            throw new ApiError(401, 'not img');
        }
        const article = <IArticle>req.body;
        const user = req.user;
        const post = await articleService.createArticle(article, imgPath, user);
        console.log(req.body);

        return res.json(post);
    }
}

export default new ArticleCotroller();
