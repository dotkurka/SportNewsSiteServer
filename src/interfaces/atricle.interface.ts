import { Types } from 'mongoose';

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

export default IArticleData;
