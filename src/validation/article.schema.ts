import Joi from 'joi';

const createSchema = Joi.object({
    img: Joi.string().required(),
    alt: Joi.string().min(2).max(15).required(),
    title: Joi.string().min(5).max(20).required(),
    description: Joi.string().min(5).max(50).required(),
    category: Joi.string().min(2).max(15).required(),
    article: Joi.string().min(5).required(),
});

const updateSchema = Joi.object({
    img: Joi.string(),
    alt: Joi.string().min(2).max(15),
    title: Joi.string().min(5).max(20),
    description: Joi.string().min(5).max(50),
    category: Joi.string().min(2).max(15),
    article: Joi.string().min(5),
});

export default { createSchema, updateSchema };
