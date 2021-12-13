/* eslint-disable no-console */
import { validate as uuidValidate } from 'uuid';
import { Request, Response, NextFunction } from 'express';
import userRepository from '../repositories/userRepository';
import helper from '../controllers/helper';

export default async function validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization
        || authorization.trim() === ''
        || !authorization.includes('Bearer ')
    ) return res.status(400).send('You must inform a valid bearer token on header');

    const token = authorization.replace('Bearer ', '');

    if (token.trim() === '') return res.status(422).send('Token shouldn`t be an empty string');
    if (!uuidValidate(token)) return res.status(400).send('Invalid token');

    try {
        const foundUser = await userRepository.findUserByToken(token);
        if (!foundUser) return res.status(404).send('Invalid token');

        req.body.user = foundUser;
        return next();
    } catch (error) {
        if (helper.errorIsKnown(error)) return res.status(error.statusCode).send(error.message);
        console.error('INTERNAL SERVER ERROR');
        console.log(error);
        return res.sendStatus(500);
    }
}
