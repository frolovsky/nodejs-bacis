const User = require('./user.model');
const db = require('../../common/db.temp');
const TABLE_NAME = 'Users';

const getAll = async () => {
  return db[TABLE_NAME].map(User.toResponse);
};

const getById = async id => {
  const user = await db[TABLE_NAME].find(u => u.id === id);
  if (!user) {
    throw new Error(`Cannot find user with ${id} id`);
  }
  return User.toResponse(user);
};

const create = async data => {
  if (!validateLogin(data.login)) {
    throw new Error(`User with ${data.login} already exist.`);
  }
  const user = new User({ ...data });
  await db[TABLE_NAME].push(user);
  return User.toResponse(user);
};

const update = async (id, data) => {
  const user = await db[TABLE_NAME].find(u => u.id === id);
  if (!user) {
    throw new Error(`Cannot find user with ${id} id`);
  }
  if (data.login && data.login !== user.login && !validateLogin(data.login)) {
    throw new Error(`User with ${data.login} already exist.`);
  }
  user.id = data.id || user.id;
  user.name = data.name || user.name;
  user.login = data.login || user.login;
  user.password = data.password || user.password;

  return 'User successfully updated';
};

const remove = async id => {
  const indexDeletedUser = db[TABLE_NAME].findIndex(u => u.id === id);
  if (!indexDeletedUser && indexDeletedUser !== 0) {
    throw new Error(`Cannot find user with ${id} id`);
  }
  db.tasksGarbageCollector(id);
  db[TABLE_NAME].splice(indexDeletedUser, 1);
  return `User with id:${id} successfully deleted.`;
};

const validateLogin = login => {
  const user = db[TABLE_NAME].find(u => u.login === login);
  return !!!user;
};

module.exports = { getAll, getById, create, update, remove };
