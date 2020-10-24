const uuid = require('uuid');
const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: String,
  order: Number
});

const BoardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: String,
    columns: [ColumnSchema]
  },
  { versionKey: false }
);

const toResponse = board => {
  const { _id, title, columns } = board;
  return { id: _id, title, columns };
};

const Board = mongoose.model('Board', BoardSchema);

module.exports = { Board, toResponse };
