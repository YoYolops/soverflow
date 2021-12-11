import express from 'express';
import cors from 'cors';
import questionRouter from './routers/questionRouter';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/questions', questionRouter);

export default app;
