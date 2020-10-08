const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const db = {
  Users: [],
  Columns: [],
  Boards: [],
  Tasks: [],
  init() {
    for (let i = 0; i < 3; i++) {
      db.Users.push(new User());
    }

    db.Boards.push(new Board());
    db.Tasks.push(new Task());
  }
};

db.init();
console.log('db-init');

module.exports = db;
