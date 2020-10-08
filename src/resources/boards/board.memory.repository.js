const Board = require('./board.model');
const db = require('../../common/db.temp');
const TABLE_NAME = 'Boards';

const getAll = async () => {
  return db[TABLE_NAME];
};

const getById = async id => {
  const board = await db[TABLE_NAME].find(b => b.id === id);
  if (!board) {
    return `Cannot find board with ${id} id.`;
  }
  return board;
};

const create = async data => {
  const board = new Board({ ...data });
  await db[TABLE_NAME].push(board);
  return board;
};

const update = async (id, data) => {
  const board = await db[TABLE_NAME].find(b => b.id === id);
  if (!board) {
    return `Cannot find board with ${id} id.`;
  }
  board.id = data.id || board.id;
  board.title = data.title || board.title;
  board.columns = data.columns || board.columns;
  return 'Board successfully updated';
};

const remove = async id => {
  const indexDeletedBoard = db[TABLE_NAME].findIndex(board => board.id === id);
  if (!indexDeletedBoard) {
    return `Cannot find board with ${id} id.`;
  }
  db.Tasks.filter(t => t.boardId === id).forEach((t, i) =>
    db.Tasks.splice(i, 1)
  );
  db[TABLE_NAME].splice(indexDeletedBoard, 1);
  return `Board with id:${id} successfully deleted.`;
};

module.exports = { getAll, getById, create, update, remove };
