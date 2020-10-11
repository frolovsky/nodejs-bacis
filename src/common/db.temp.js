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
  },
  boardsGarbageCollector(deletedBoardId) {
    this.Tasks.forEach((t, i) => {
      if (t.boardId === deletedBoardId) {
        this.Tasks.splice(i, 1);
        this.boardsGarbageCollector(deletedBoardId);
      }
    });
  },
  tasksGarbageCollector(deletedUserId) {
    this.Tasks.forEach(t => {
      if (t.userId === deletedUserId) {
        t.userId = null;
      }
    });
  }
};

module.exports = db;
