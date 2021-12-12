import { Request, Response, NextFunction } from 'express';

function serverErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error('INTERNAL SERVER ERROR');
    console.log(err);
    res.sendStatus(500);
}

export default serverErrorHandler;
