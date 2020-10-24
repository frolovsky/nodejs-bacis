const { Task } = require('./task.model');

const getAll = async id => Task.find({ boardId: id });

const getById = async (bid, tid) => {
  return Task.findOne({
    boardId: bid,
    _id: tid
  });
};

const create = async (id, data) => Task.create({ ...data, boardId: id });

const update = async (tid, bid, data) =>
  Task.findByIdAndUpdate(tid, { ...data, bid });

const remove = async (tid, bid) => {
  return Task.findOneAndDelete({
    _id: tid,
    boardId: bid
  });
};

module.exports = { getAll, getById, create, update, remove };
