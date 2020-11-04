const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    name: String,
    login: String,
    password: String
  },
  { versionKey: false }
);
// eslint-disable-next-line func-names, space-before-function-paren
UserSchema.pre('save', function(next) {
  const user = this;

  bcrypt.hash(user.password, 10, (err, encrypted) => {
    if (err) {
      throw new Error(err);
    }
    user.password = encrypted;
    next();
  });
});

const toResponse = user => {
  const { _id, name, login } = user;
  return { id: _id, name, login };
};

const User = mongoose.model('User', UserSchema);

module.exports = { User, toResponse };
