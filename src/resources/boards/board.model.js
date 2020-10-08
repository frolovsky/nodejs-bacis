const uuid = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'Title', columns = 'Columns' } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
