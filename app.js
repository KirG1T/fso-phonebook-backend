const express = require('express');
const cors = require('cors');
const personsRouter = require('./controllers/persons');
const infoRouter = require('./controllers/info');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

app.use(logger.morganTinyLogger);
app.use(logger.morganCustomLogger);

app.use('/info', infoRouter);
app.use('/api/persons', personsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
