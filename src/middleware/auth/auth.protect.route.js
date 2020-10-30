const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const { UnauthorizedError } = require('../../common/error.classes');

const checkJWT = async (req, res, next) => {
  try {
    const auth = req.headers.authorization.split(' ');
    const token = auth[1] || false;
    if (token) {
      jwt.verify(token, JWT_SECRET_KEY);
    } else {
      throw new UnauthorizedError();
    }
    return next();
  } catch {
    return next(new UnauthorizedError());
  }
};

module.exports = { checkJWT };
