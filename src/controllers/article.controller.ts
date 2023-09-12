import { Request, Response } from 'express';

import PropagateError from '../decorators/PropagateError.decorator.js';
import { IArticleData, IRequestQuery } from '../interfaces/index.js';
import { TypedRequestQuery } from '../interfaces/request.interface.js';
import ApiError from '../responses/ApiError.handler.js';

import { articleService } from '../services/index.js';

@PropagateError
class ArticleCotroller {
    async createArticle(req: Request, res: Response) {
        const article = <IArticleData>req.body;
        const user = req.user;
        const post = await articleService.create(article, user);
        console.log(req.body);

        return res.json(post);
    }

    async getArticles(req: TypedRequestQuery<IRequestQuery>, res: Response) {
        const { title, category, limit, page } = req.query;
        const data = await articleService.getAll({ title, category, limit, page });

        return res.json(data);
    }

    async getArticleByParams(req: Request, res: Response) {
        const params = req.params.pathArticle;
        const article = await articleService.getByParams(params);

        return res.json(article);
    }

    async updateArticle(req: Request, res: Response) {
        const params = req.params.pathArticle;
        const article = <IArticleData>req.body;
        const user = req.user;
        const updatedArticle = await articleService.update(params, article, user);

        return res.json(updatedArticle);
    }

    async removeArticle(req: Request, res: Response) {
        const params = req.params.pathArticle;
        const user = req.user;
        const article = await articleService.remove(params, user);

        return res.status(200).json({ message: `Article ${article?.path} deleted` });
    }
}

export default new ArticleCotroller();
