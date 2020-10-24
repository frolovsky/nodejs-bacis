const { createLogger, format, transports } = require('winston');
const { maskPasswordFromRequest } = require('../helpers/response.helper');

const logger = createLogger({
  level: 'silly',
  format: format.combine(format.colorize(), format.cli()),
  transports: [new transports.Console()]
});

const requsetLogger = (req, res, next) => {
  logger.info(
    JSON.stringify({
      url: req.url,
      query: req.query,
      params: req.params,
      body: maskPasswordFromRequest(req.body)
    })
  );
  next();
};

module.exports = { logger, requsetLogger };
