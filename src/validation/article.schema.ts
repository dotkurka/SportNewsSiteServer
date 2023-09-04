import Joi from 'joi';

const validationArticleSchema = Joi.object({
    file: Joi.object(),
    alt: Joi.string().min(2).max(15).required(),
    title: Joi.string().min(5).max(20).required(),
    description: Joi.string().min(5).max(50).required(),
    category: Joi.string().min(2).max(15).required(),
    article: Joi.string().min(5).required(),
});

export default validationArticleSchema;
