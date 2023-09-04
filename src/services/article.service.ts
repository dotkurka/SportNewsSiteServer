import uniqid from 'uniqid';

import { messageConstants } from '../constants/index.js';
import { IAppFile, IArticle, IUser } from '../interfaces/index.js';
import { ArticleModel } from '../models/index.js';
import ApiError from '../responses/ApiError.handler.js';
import { currentDate } from '../utils/index.js';

// In process...

const getAllArticle = async () => {
    const data = await ArticleModel.find();
    return data;
};

const createArticle = async (articleData: IArticle, imgPath: string, user: IUser) => {
    if (!user) {
        throw new ApiError(401, messageConstants.unauthorized);
    }
    const createDate = currentDate();
    const pathArticle = uniqid() + articleData.title.replaceAll(/[\s/_?\.]/g, ' ').replaceAll(' ', '-');
    const article = new ArticleModel({
        img: imgPath,
        alt: articleData.alt,
        title: articleData.title,
        description: articleData.description,
        category: articleData.category,
        atricle: articleData.article,
        published: createDate,
        path: pathArticle,
        user: user.id,
    });

    const newArticle = await article.save();

    return newArticle;
};

export default {
    getAllArticle,
    createArticle,
};
