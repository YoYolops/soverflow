import { Router } from 'express';
import questionController from '../controllers/questionController';
import tokenValidator from '../middlewares/tokenValidator';

const routes = Router();

routes.post('', questionController.createQuestion);
routes.post('/:id', tokenValidator, questionController.setQuestionAsAnswered);

routes.get('', questionController.getUnansweredQuestions);
routes.get('/:id', questionController.getQuestionById);

export default routes;
