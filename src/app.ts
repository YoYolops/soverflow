import express from 'express';
import cors from 'cors';
import questionRouter from './routers/questionRouter';
import userRouter from './routers/userRouter';
import serverErrorHandler from './middlewares/serverErrorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/questions', questionRouter);
app.use('/users', userRouter);

app.use(serverErrorHandler);

export default app;
