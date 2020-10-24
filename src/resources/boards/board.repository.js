const { Board } = require('./board.model');

const getAll = async () => Board.find({});

const getById = async id => Board.findById(id);

const create = async board => Board.create(board);

const update = async (id, data) => Board.findByIdAndUpdate(id, data);

const remove = async id => Board.findByIdAndDelete(id);

module.exports = { getAll, getById, create, update, remove };
