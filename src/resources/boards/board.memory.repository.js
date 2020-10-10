const Board = require('./board.model');
const db = require('../../common/db.temp');
const TABLE_NAME = 'Boards';

const getAll = async () => {
  return db[TABLE_NAME];
};

const getById = async id => {
  const board = await db[TABLE_NAME].find(b => b.id === id);
  if (!board) {
    return {
      message: `Cannot find board with ${id} id.`,
      error: 'Not found'
    };
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
  if (!indexDeletedBoard && indexDeletedBoard !== 0) {
    return {
      message: `Cannot find board with ${id} id.`,
      error: 'Not found'
    };
  }
  db.boardsGarbageCollector(id);
  db[TABLE_NAME].splice(indexDeletedBoard, 1);
  return `Board with id:${id} successfully deleted.`;
};

module.exports = { getAll, getById, create, update, remove };
