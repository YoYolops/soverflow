import Joi from 'joi';

const question = Joi.object({
    question: Joi.string().required(),
    student: Joi.string().required(),
    class: Joi.string().required(),
    tags: Joi.string().required(),
});

const user = Joi.object({
    name: Joi.string().required(),
    class: Joi.string().required(),
});

const schema = {
    question,
    user,
};

export default schema;
