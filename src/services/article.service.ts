import uniqid from 'uniqid';
import { Result, ValidationError } from 'express-validator';

import { messageConstants } from '../constants/index.js';
import { IArticle, IUser } from '../interfaces/index.js';
import { ArticleModel } from '../models/index.js';
import ApiError from '../responses/ApiError.handler.js';
import { currentDate } from '../utils/index.js';

// In process...

const getAllArticle = async () => {
    const data = await ArticleModel.find();
    return data;
};

const createArticle = (
    articleData: IArticle,
    imgPath: string,
    user: IUser,
    erorrs: Result<ValidationError>
) => {
    if (!erorrs.isEmpty()) {
        throw new ApiError(400, messageConstants.registrationError);
    }
    const createDate = currentDate();
    const pathArticle =
        uniqid() + articleData.title.head.replaceAll(/[\s/_?\.]/g, ' ').replaceAll(' ', '-');

    const post = new ArticleModel({
        img: imgPath,
        alt: articleData.alt,
        title: {
            published: createDate,
            head: articleData.title.head,
            description: articleData.title.description,
        },
        category: articleData.category,
        atricle: articleData.article,
        path: pathArticle,
        user: user.id,
    });
};

export default {
    getAllArticle,
    createArticle,
};
