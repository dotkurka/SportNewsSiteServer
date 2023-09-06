import { Request, Response } from 'express';

import PropagateError from '../decorators/PropagateError.decorator.js';
import { IArticleData, IRequestQuery } from '../interfaces/index.js';
import { TypedRequestQuery } from '../interfaces/request.interface.js';
import ApiError from '../responses/ApiError.handler.js';

import { articleService } from '../services/index.js';

@PropagateError
class ArticleCotroller {
    async getArticles(req: TypedRequestQuery<IRequestQuery>, res: Response) {
        const { title, category, limit, page } = req.query;
        const data = await articleService.getAll({ title, category, limit, page });

        return res.json(data);
    }

    async createArticle(req: Request, res: Response) {
        const imgPath = req.uploadedFiles[0].path;
        const article = <IArticleData>req.body;
        const user = req.user;

        const post = await articleService.create(article, imgPath, user);
        console.log(req.body);

        return res.json(post);
    }

    async getArticleByParams(req: Request, res: Response) {
        const params = req.params.pathArticle;
        const article = await articleService.getByParams(params);

        return res.json(article);
    }
}

export default new ArticleCotroller();
