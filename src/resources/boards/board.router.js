const router = require('express').Router();
const boardsService = require('./board.service');
const { toResponse } = require('./board.model');
const { taskGarbageColletor } = require('../tasks/task.model');
const { NotFoundError } = require('../../common/error.classes');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(board => toResponse(board)));
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const { id } = req.params;
    const board = await boardsService.getById(id);
    if (!!!board) {
      throw new NotFoundError(`Board with id: ${id} not found.`);
    }
    res.json(toResponse(board));
  } catch (e) {
    return next(e);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(req.body);
  res.json(toResponse(board));
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const { id } = req.params;
    const board = await boardsService.update(id, req.body);
    if (!!!board) {
      throw new NotFoundError(`Board with id: ${id} not found.`);
    }
    res.json(toResponse(board));
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const { id } = req.params;
    const board = await boardsService.remove(id);
    if (!!!board) {
      throw new NotFoundError(`Board with id: ${id} not found.`);
    }
    await taskGarbageColletor(id);
    res.json(board);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
