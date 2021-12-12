import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';
import helper from './helper';

async function createUser(req: Request, res: Response, next: NextFunction) {
    const { name, class: classe } = req.body;
    if (!name || !classe) return res.sendStatus(400);

    try {
        const response = await userService.registerUser(req.body);
        return res.status(201).send(response);
    } catch (error) {
        if (helper.errorIsKnown(error)) return res.status(error.statusCode).send(error.message);
        return next(error);
    }
}

export default {
    createUser,
};
