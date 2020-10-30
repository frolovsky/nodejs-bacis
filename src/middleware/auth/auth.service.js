const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../resources/users/user.model');
const { AuthError, NotFoundError } = require('../../common/error.classes');
const { JWT_SECRET_KEY } = require('../../common/config');

const login = async (userLogin, password) => {
  const user = await User.findOne({ login: userLogin });
  console.log(user);
  if (!user) {
    throw new NotFoundError(`User with login: ${userLogin} doesn't exist.`);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AuthError('Wrong password.');
  }

  const token = jwt.sign(
    {
      userId: user._id,
      login: user.login
    },
    JWT_SECRET_KEY,
    {
      expiresIn: '1h'
    }
  );
  return token;
};

module.exports = { login };
