import Joi from 'joi';

const question = Joi.object({
    question: Joi.string().required(),
    student: Joi.string().required(),
    class: Joi.string().required(),
    tags: Joi.string().required(),
});

const schema = {
    question,
};

export default schema;
