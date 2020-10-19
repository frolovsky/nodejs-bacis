const { createLogger, format, transports } = require('winston');
const {
  removePasswordFromResponse
} = require('../validators/response.validator');

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transports: [new transports.Console()]
});

const requsetLogger = (req, res, next) => {
  logger.info(
    JSON.stringify({
      url: req.url,
      params: req.params,
      body: removePasswordFromResponse(req.body)
    })
  );
  next();
};

module.exports = { logger, requsetLogger };
