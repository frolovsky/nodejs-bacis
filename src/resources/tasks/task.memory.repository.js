const Task = require('./task.model');
const db = require('../../common/db.temp');
const TABLE_NAME = 'Tasks';

const getAll = async id => {
  const tasks = db[TABLE_NAME].find(t => t.boardId === id);
  return tasks;
};

const getById = async (bid, tid) => {
  const task = await db[TABLE_NAME].find(
    t => t.boardId === bid && t.taskId === tid
  );
  if (!task) {
    return `Cannot find task with boardId: ${bid}, taskId: ${tid} id.`;
  }
  return task;
};

const create = async (id, data) => {
  const task = new Task({ ...data, boardId: id });
  await db[TABLE_NAME].push(task);
  return task;
};

const update = async (bid, tid, data) => {
  const task = await db[TABLE_NAME].find(
    t => t.boardId === bid && t.taskId === tid
  );
  if (!task) {
    return `Cannot find task with boardId: ${bid}, taskId: ${tid} id.`;
  }
  task.id = data.id || task.id;
  task.title = data.title || task.title;
  task.order = data.order || task.order;
  task.description = data.description || task.description;
  task.userId = data.userId || task.userId;
  task.boardId = data.boardId || task.boardId;
  task.columnId = data.columnId || task.columnId;
  return {
    result: 'Task successfully updated'
  };
};

const remove = async (bid, tid) => {
  const indexDeletedTask = await db[TABLE_NAME].findIndex(
    t => t.boardId === bid && t.taskId === tid
  );
  if (!indexDeletedTask) {
    return `Cannot find task with boardId: ${bid}, taskId: ${tid} id.`;
  }
  db[TABLE_NAME].splice(indexDeletedTask, 1);
  return `Task with boardId: ${bid}, taskId: ${tid} successfully deleted.`;
};

module.exports = { getAll, getById, create, update, remove };
