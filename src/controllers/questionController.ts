import { Request, Response, NextFunction } from 'express';
import questionService from '../services/questionService';
import helpers from './helpers';

async function createQuestion(req: Request, res: Response, next: NextFunction) {
    const {
        question,
        student,
        class: classe,
        tags,
    } = req.body;
    if (!question || !student || !classe || !tags) return res.sendStatus(400);

    try {
        const response = await questionService.openQuestion(req.body);
        return res.status(201).send({ id: response.id });
    } catch (error) {
        if (helpers.errorIsKnown(error)) return res.status(error.statusCode).send(error.message);
        return next(error);
    }
}

export default {
    createQuestion,
};
