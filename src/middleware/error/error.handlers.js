const { NotFoundError } = require('./error.helpers');

exports.notFoundHandler = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(err.status).send(err.text);
    return;
  }
  next(err);
};
exports.anyErrorsHandler = (err, req, res) => {
  if (err) {
    res.status(500).send('Error: Internal Server Error');
  }
  return;
};
