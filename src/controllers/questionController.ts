import { Request, Response, NextFunction } from 'express';
import questionService from '../services/questionService';
import helper from './helper';

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
        return res.status(201).send(response);
    } catch (error) {
        if (helper.errorIsKnown(error)) return res.status(error.statusCode).send(error.message);
        return next(error);
    }
}

async function getQuestionById(req: Request, res:Response, next: NextFunction) {
    const { id: questionId } = req.params;
    if (!questionId || !Number(questionId)) return res.sendStatus(400);

    try {
        const response = await questionService.searchQuestion(Number(questionId));
        return res.send(response);
    } catch (error) {
        if (helper.errorIsKnown(error)) return res.status(error.statusCode).send(error.message);
        return next(error);
    }
}

async function getUnansweredQuestions(req: Request, res: Response, next: NextFunction) {
    try {
        const response = await questionService.searchAllUnansweredQuestions();
        return res.send(response);
    } catch (error) {
        if (helper.errorIsKnown(error)) return res.status(error.statusCode).send(error.message);
        return next(error);
    }
}

export default {
    createQuestion,
    getQuestionById,
    getUnansweredQuestions,
};
