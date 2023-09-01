import { CategoryModel } from '../models/index.js';

const getAllCategory = async () => {
    const data = await CategoryModel.find();
    return data;
};

export default {
    getAllCategory,
};
