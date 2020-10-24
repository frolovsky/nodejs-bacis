const boardsRepo = require('./board.repository');

const getAll = () => boardsRepo.getAll();

const getById = id => boardsRepo.getById(id);

const create = data => boardsRepo.create(data);

const update = (id, data) => boardsRepo.update(id, data);

const remove = id => boardsRepo.remove(id);

module.exports = { getAll, getById, create, update, remove };
