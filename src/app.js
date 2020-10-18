const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const db = require('./common/db.temp');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const logger = require('./middleware/logger');
const {
  notFoundHandler,
  anyErrorsHandler
} = require('./middleware/error/error.handlers');

db.init();

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use(logger);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

app.use(notFoundHandler, anyErrorsHandler);
process.on('uncaughtException', err => {
  throw new Error(err.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  throw new Error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;
