require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./router/authRouter');

const PORT = process.env.PORT_SERVER;

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
};

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());
app.use('/auth', cors(corsOptions), authRouter);

app.listen(PORT, () => {
    console.log(`Server Started on port: ${PORT}`);
});
