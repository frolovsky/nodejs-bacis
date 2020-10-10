const router = require('express').Router();
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  if (board.error) {
    return res.sendStatus(404).end();
  }
  res.json(board);
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(req.body);
  res.json(board);
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  const result = await boardsService.remove(req.params.id);
  res.json(result);
});

module.exports = router;
