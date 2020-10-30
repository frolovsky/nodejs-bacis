const {
  NOT_FOUND,
  BAD_REQUEST,
  FORBIDDEN,
  UNAUTHORIZED,
  getStatusText
} = require('http-status-codes');

class NotFoundError extends Error {
  constructor(text = getStatusText(NOT_FOUND)) {
    super();
    this.status = NOT_FOUND;
    this.text = text;
  }
}

class BadRequestError extends Error {
  constructor() {
    super();
    this.status = BAD_REQUEST;
    this.text = getStatusText(BAD_REQUEST);
  }
}

class AuthError extends Error {
  constructor(text = getStatusText(FORBIDDEN)) {
    super();
    this.status = FORBIDDEN;
    this.text = text;
  }
}

class UnauthorizedError extends Error {
  constructor(text = getStatusText(UNAUTHORIZED)) {
    super();
    this.status = UNAUTHORIZED;
    this.text = text;
  }
}

module.exports = {
  AuthError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError
};
