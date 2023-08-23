import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import { Request, Response } from 'express';

import authRouter from './router/authRouter.js';
import apiRouter from './router/apiRouter.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

const PORT = process.env.PORT_SERVER;

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

mongoose.connect(process.env.DB_URL as string);
const db = mongoose.connection;
db.on('error', (err: string) => console.log(err));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

app.use('/auth', cors(corsOptions), authRouter);
app.use('/api', cors(corsOptions), apiRouter);
app.use(errorMiddleware);

app.get('/', (req: Request, res: Response) => {
    res.send('Server works');
});

app.listen(PORT, () => {
    console.log(`Server Started on port: ${PORT}`);
});
