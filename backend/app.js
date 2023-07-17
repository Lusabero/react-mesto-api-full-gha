require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { errorHandler, handleNotFound } = require('./middlewares/errorHandler');
const { validateUser } = require('./validation/validation');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.use(cors());
app.get('/crash-test', () => {
    setTimeout(() => {
        throw new Error('Сервер сейчас упадёт');
    }, 0);
});
app.post('/signin', validateUser, login);
app.post('/signup', validateUser, createUser);
app.use(auth);
app.use(userRouter);
app.use(cardRouter);
app.use(errorLogger);
app.use(errors());
app.use(handleNotFound);
app.use(errorHandler);

const start = async() => {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
    // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();