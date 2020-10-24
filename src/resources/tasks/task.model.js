const uuid = require('uuid');
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String
  },
  { versionKey: false }
);

const Task = mongoose.model('Task', TaskSchema);

const toResponse = task => {
  const {
    _id: id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

const taskUserIdUpadte = async id =>
  Task.updateMany({ userId: id }, { $set: { userId: null } });

const taskGarbageColletor = async id => Task.deleteMany({ boardId: id });

module.exports = { Task, toResponse, taskUserIdUpadte, taskGarbageColletor };
