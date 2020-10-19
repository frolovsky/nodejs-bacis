const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const { NotFoundError } = require('../../common/error.classes');

router.route('/').get(async (req, res, next) => {
  try {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks);
  } catch (e) {
    return next(new NotFoundError());
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const task = await tasksService.getById(req.params.boardId, req.params.id);
    res.json(task);
  } catch (e) {
    return next(new NotFoundError());
  }
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.create(req.params.boardId, req.body);
  res.json(task);
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const task = await tasksService.update(
      req.params.boardId,
      req.params.id,
      req.body
    );
    res.json(task);
  } catch (e) {
    return next(new NotFoundError());
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const result = await tasksService.remove(req.params.boardId, req.params.id);
    res.send(result);
  } catch (e) {
    return next(new NotFoundError());
  }
});

module.exports = router;
