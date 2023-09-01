import { Types } from 'mongoose';

interface IArticleData {
    img: string;
    alt: string;
    title: {
        published: string;
        head: string;
        description: string;
    };
    category: string;
    article: string;
    path: string;
    user: Types.ObjectId;
}

export default IArticleData;
