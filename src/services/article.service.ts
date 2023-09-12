import uniqid from 'uniqid';

import { messageConstants, userRoles } from '../constants/index.js';
import { IAppFile, IArticleData, IRequestQuery, IUser } from '../interfaces/index.js';
import { ArticleModel } from '../models/index.js';
import ApiError from '../responses/ApiError.handler.js';
import { currentDate } from '../utils/index.js';

// In process...

const create = async (articleData: IArticleData, user: IUser) => {
    if (!user) {
        throw new ApiError(401, messageConstants.unauthorized);
    }
    const createDate = currentDate();
    const pathArticle = `${uniqid.time()}-${articleData.title
        .replaceAll(/[\s/_?\.]/g, ' ')
        .replaceAll(' ', '-')}`;

    const article = new ArticleModel({
        img: articleData.img,
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

const getAll = async (query: IRequestQuery) => {
    let { title, category, limit, page } = query;
    limit = limit * 1 || 10;
    page = page || 1;
    let offset = page * limit - limit;
    let article;

    if (!title && !category) {
        article = await ArticleModel.find().limit(limit).skip(offset).sort({ published: -1 });
    }
    if (title && !category) {
        article = await ArticleModel.find({ title }).limit(limit).skip(offset).sort({ published: -1 });
    }
    if (!title && category) {
        article = await ArticleModel.find({ category })
            .limit(limit)
            .skip(offset)
            .sort({ published: -1 });
    }
    if (title && category) {
        article = await ArticleModel.find({ title, category })
            .limit(limit)
            .skip(offset)
            .sort({ published: -1 });
    }
    if (!article) {
        throw new ApiError(404, messageConstants.notFoundPage);
    }

    return article;
};

const getByParams = async (params: string) => {
    const article = await ArticleModel.findOne({ path: params }).populate('user').exec();
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
        });

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
