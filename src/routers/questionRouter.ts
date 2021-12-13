import { Router } from 'express';
import questionController from '../controllers/questionController';

const routes = Router();

routes.post('', questionController.createQuestion);

routes.get('', questionController.getUnansweredQuestions);
routes.get('/:id', questionController.getQuestionById);

export default routes;
