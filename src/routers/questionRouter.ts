import { Router } from 'express';
import questionController from '../controllers/questionController';

const routes = Router();

routes.post('', questionController.createQuestion);

export default routes;
