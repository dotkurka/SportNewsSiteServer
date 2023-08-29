import { articleModel } from '../models/index.js';

const getAllArticle = async () => {
    const data = await articleModel.find();
    return data;
};

export default {
    getAllArticle,
};
