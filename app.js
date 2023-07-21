require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
// const { errors } = require('celebrate');
const helmet = require('helmet');
const { DATABASE, PORT } = require('./utils/constants');

const app = express();

const handelErrors = require('./middlewares/handelErrors');
const indexRouter = require('./routes/index');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors);
app.use(limiter);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
// app.use(errors());
app.use(indexRouter);
app.use(errorLogger);

app.use(handelErrors);

mongoose.connect(DATABASE);

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
