const router = require('express').Router();
const boardsService = require('./board.service');
const { NotFoundError } = require('../../common/error.classes');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardsService.getById(req.params.id);
    res.json(board);
  } catch (e) {
    return next(new NotFoundError());
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(req.body);
  res.json(board);
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const board = await boardsService.update(req.params.id, req.body);
    res.json(board);
  } catch (e) {
    return next(new NotFoundError());
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const result = await boardsService.remove(req.params.id);
    res.json(result);
  } catch (e) {
    return next(new NotFoundError());
  }
});

module.exports = router;
