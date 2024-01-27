import { Types } from 'mongoose';
import { Query } from 'express-serve-static-core';

interface IArticleData {
    img: string;
    alt: string;
    title: string;
    description: string;
    category: Types.ObjectId;
    article: string;
    published: string;
    path: string;
    user: Types.ObjectId;
}

interface IArticleQuery extends Query {
    title: string;
    category: string;
    limit: string | any;
    page: string | any;
}

export { IArticleData, IArticleQuery };
