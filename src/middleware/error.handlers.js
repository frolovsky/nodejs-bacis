const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const { logger } = require('./logger');

const errorHandler = async (err, req, res, next) => {
  if (err) {
    const status = err.status ? err.status : INTERNAL_SERVER_ERROR;
    logger.error(JSON.stringify({ status, message: getStatusText(status) }));
    await res.status(status).json({ message: getStatusText(status) });
    return;
  }
  next();
};

module.exports = { errorHandler };
