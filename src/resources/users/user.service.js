const usersRepo = require('./user.repository');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const create = data => usersRepo.create(data);
const update = (id, data) => usersRepo.update(id, data);
const remove = id => usersRepo.remove(id);

module.exports = { getAll, getById, create, update, remove };
