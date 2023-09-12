import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParse from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import formData from 'express-form-data';
import MasterRouter from './routes/index.js';
import { errorMiddleware } from './middlewares/index.js';
import { corsOptions } from './constants/index.js';
import fileRouter from './routes/file.router.js';

const { json, raw, text } = bodyParse;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(json());
app.use(raw());
app.use(text());
app.use(formData.parse());
app.use(express.json({ limit: '1000kb' }));
app.use(cors(corsOptions));
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

dotenv.config();

const PORT = process.env.PORT_SERVER;

mongoose.connect(process.env.DB_URL as string);
const db = mongoose.connection;
db.on('error', (err: string) => console.log(err));
db.once('open', () => console.log('Connected to Database'));

app.use('/api', MasterRouter);
app.use('/uploads', fileRouter);
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Success', status: 200 });
});

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server Started on port: ${PORT}`);
});
