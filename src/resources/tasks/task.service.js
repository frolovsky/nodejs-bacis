const tasksRepo = require('./task.memory.repository');

const getAll = id => tasksRepo.getAll(id);

const getById = (bid, tid) => tasksRepo.getById(bid, tid);

const create = (id, data) => tasksRepo.create(id, data);

const update = (bid, tid, data) => tasksRepo.update(bid, tid, data);

const remove = (bid, tid) => tasksRepo.remove(bid, tid);

module.exports = { getAll, getById, create, update, remove };
