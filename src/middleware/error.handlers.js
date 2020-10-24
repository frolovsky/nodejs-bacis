const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { logger } = require('./logger');

const errorHandler = async (err, req, res, next) => {
  if (err) {
    const status = err.status ? err.status : INTERNAL_SERVER_ERROR;
    logger.error(JSON.stringify({ status, message: err.text }));
    await res.status(status).json(err.text);
    return;
  }
  next();
};

module.exports = { errorHandler };
