const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { requsetLogger, logger } = require('./middleware/logger');
const { errorHandler } = require('./middleware/error.handlers');
const Auth = require('./middleware/auth');
const exit = process.exit;

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

process
  .on('uncaughtException', err => {
    err.statusCode = 500;
    err.message = `Detect error: ${err.message}`;
    logger.error(err, err.stack);
    exit(1);
  })
  .on('unhandledRejection', (reason, promise) => {
    logger.error(
      `unhandledRejection. Reason: ${
        reason.message
      }, in promise: ${JSON.stringify(promise)}`
    );
    exit(1);
  });

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(requsetLogger);

app.use('/', Auth.AuthRouter);
app.use('/users', Auth.AuthProtect.checkJWT, userRouter);
app.use('/boards', Auth.AuthProtect.checkJWT, boardRouter);
app.use('/boards/:boardId/tasks', Auth.AuthProtect.checkJWT, taskRouter);

app.use(errorHandler);

module.exports = app;
