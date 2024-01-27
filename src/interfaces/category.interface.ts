import { Query } from 'express-serve-static-core';

interface ICategoryQuery extends Query {
    title: string;
    category: string;
}

interface ICategory {
    title: string;
    path: string;
    subItem?: ICategory[];
}

export { ICategoryQuery, ICategory };
