const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const { toResponse } = require('./task.model');
const { NotFoundError } = require('../../common/error.classes');

router.route('/').get(async (req, res, next) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks.map(task => toResponse(task)));
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const { boardId, id } = req.params;
    const task = await tasksService.getById(boardId, id);
    if (!!!task) {
      throw new NotFoundError(
        `Task with boardId: ${boardId}, taskId: ${id} not found.`
      );
    }
    res.json(toResponse(task));
  } catch (e) {
    return next(e);
  }
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.create(req.params.boardId, req.body);
  res.json(toResponse(task));
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const { boardId, id } = req.params;
    const task = await tasksService.update(id, boardId, req.body);
    if (!!!task) {
      throw new NotFoundError(
        `Task with boardId: ${boardId}, taskId: ${id} not found.`
      );
    }
    res.json(toResponse(task));
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const result = await tasksService.remove(req.params.id, req.params.boardId);
    res.send(result);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
