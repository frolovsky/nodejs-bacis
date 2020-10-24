const tasksRepo = require('./task.repository');

const getAll = id => tasksRepo.getAll(id);

const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);

const create = (id, data) => tasksRepo.create(id, data);

const update = (taskId, boardId, data) =>
  tasksRepo.update(taskId, boardId, data);

const remove = (taskId, boardId) => tasksRepo.remove(taskId, boardId);

module.exports = { getAll, getById, create, update, remove };
