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

const toResponse = user => {
  const { _id, name, login } = user;
  return { id: _id, name, login };
};

const User = mongoose.model('User', UserSchema);

module.exports = { User, toResponse };
