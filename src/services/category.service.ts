import { messageConstants } from '../constants/index.js';
import { CategoryModel } from '../models/index.js';
import ApiError from '../responses/ApiError.handler.js';

const getAllCategory = async () => {
    const data = await CategoryModel.find();
    return data;
};

const getOneByParams = async (params: string) => {
    const category = await CategoryModel.findOne({ title: params });

    if (!category) {
        throw new ApiError(404, messageConstants.notFoundPage);
    }

    return category;
};

export default {
    getAllCategory,
    getOneByParams,
};
