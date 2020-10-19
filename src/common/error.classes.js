const { NOT_FOUND, BAD_REQUEST, getStatusText } = require('http-status-codes');

class NotFoundError extends Error {
  constructor() {
    super();
    this.status = NOT_FOUND;
    this.text = getStatusText(NOT_FOUND);
  }
}

class BadRequestError extends Error {
  constructor() {
    super();
    this.status = BAD_REQUEST;
    this.text = getStatusText(BAD_REQUEST);
  }
}

module.exports = { NotFoundError, BadRequestError };
