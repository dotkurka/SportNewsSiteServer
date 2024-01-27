import uniqid from 'uniqid';

import { messageConstants, userRoles } from '../constants/index.js';
import { IArticleData, IArticleQuery, IUser } from '../interfaces/index.js';
import { filterUndefinedFields } from '../utils/index.js';
import { ArticleModel } from '../models/index.js';
import ApiError from '../responses/ApiError.handler.js';

const create = async (articleData: IArticleData, user: IUser) => {
    if (!user) {
        throw new ApiError(401, messageConstants.unauthorized);
    }
    const pathArticle = `${uniqid.time()}-${articleData.title.replaceAll(/[\s/_?\.]/g, ' ').replaceAll(' ', '-')}`;
    const article = new ArticleModel({
        img: articleData.img,
        alt: articleData.alt,
        title: articleData.title,
        description: articleData.description,
        category: articleData.category,
        article: articleData.article,
        path: pathArticle,
        user: user.id,
    });

    const newArticle = await article.save().then((a) => a.populate('category', 'title'));

    return newArticle;
};

const getAll = async (query: IArticleQuery) => {
    const { title, category, limit = 10, page = 1 } = query;
    const offset = page * limit - limit;
    const queryFields = filterUndefinedFields({ title, category });

    const article = await ArticleModel.find(queryFields)
        .limit(limit * 1)
        .skip(offset)
        .sort({ published: -1 })
        .populate('category', 'title')
        .exec();

    if (!article) {
        throw new ApiError(404, messageConstants.notFoundPage);
    }

    return article;
};

const getByParams = async (params: string) => {
    const article = await ArticleModel.findOne({ path: params })
        .populate([{ path: 'user' }, { path: 'category', select: 'title' }])
        .exec();

    if (!article) {
        throw new ApiError(404, messageConstants.notFoundPage);
    }

    return article;
};

const update = async (params: string, article: IArticleData, user: IUser) => {
    const currentArticle = await ArticleModel.findOne({ path: params });

    if (!user) {
        throw new ApiError(401, messageConstants.unauthorized);
    }
    if (!currentArticle) {
        throw new ApiError(404, messageConstants.notFoundPage);
    }
    if (currentArticle.user?._id === user.id || user.roles.includes(userRoles.admin)) {
        const updatedArticle = await ArticleModel.findOneAndUpdate({ path: params }, article, {
            new: true,
        })
            .populate('category', 'title')
            .exec();

        return updatedArticle;
    }

    throw new ApiError(403, messageConstants.noAccess);
};

const remove = async (params: string, user: IUser) => {
    const currentArticle = await ArticleModel.findOne({ path: params });

    if (!user) {
        throw new ApiError(401, messageConstants.unauthorized);
    }
    if (!currentArticle) {
        throw new ApiError(404, messageConstants.notFoundPage);
    }
    if (currentArticle.user?._id === user.id || user.roles.includes(userRoles.admin)) {
        const article = await ArticleModel.findOneAndDelete({ path: params });

        return article;
    }

    throw new ApiError(403, messageConstants.noAccess);
};

export default {
    getAll,
    create,
    getByParams,
    remove,
    update,
};
