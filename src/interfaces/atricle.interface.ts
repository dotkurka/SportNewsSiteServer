import { Types } from 'mongoose';
import { Query } from 'express-serve-static-core';

interface IArticleData {
    img: string;
    alt: string;
    title: string;
    description: string;
    category: string;
    article: string;
    published: string;
    path: string;
    user: Types.ObjectId;
}

interface IRequestQuery extends Query {
    title: string;
    category: string;
    limit: string | any;
    page: string | any;
}

export { IArticleData, IRequestQuery };
