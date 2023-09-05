import uniqid from 'uniqid';

import { messageConstants } from '../constants/index.js';
import { IAppFile, IArticle, IUser } from '../interfaces/index.js';
import { ArticleModel } from '../models/index.js';
import ApiError from '../responses/ApiError.handler.js';
import { currentDate } from '../utils/index.js';

// In process...

const getAll = async () => {
    const data = await ArticleModel.find().populate('user').exec();
    return data;
};

const create = async (articleData: IArticle, imgPath: string, user: IUser) => {
    if (!user) {
        throw new ApiError(401, messageConstants.unauthorized);
    }
    const createDate = currentDate();
    const pathArticle = `${uniqid.time()}-${articleData.title
        .replaceAll(/[\s/_?\.]/g, ' ')
        .replaceAll(' ', '-')}`;

    const article = new ArticleModel({
        img: imgPath,
        alt: articleData.alt,
        title: articleData.title,
        description: articleData.description,
        category: articleData.category,
        article: articleData.article,
        published: createDate,
        path: pathArticle,
        user: user.id,
    });
    const newArticle = await article.save();

    return newArticle;
};

const getByParams = async (params: string) => {
    const article = await ArticleModel.findOne({ path: params }).populate('user').exec();
    if (!article) {
        throw new ApiError(404, messageConstants.notFoundPage);
    }

    return article;
};

const getByQuery = async (query: string) => {
    console.log(query);

    const article = await ArticleModel.find().limit(2);
    if (!article) {
        throw new ApiError(404, messageConstants.notFoundPage);
    }

    return article;
};

export default {
    getAll,
    create,
    getByParams,
    getByQuery,
};
