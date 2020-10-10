const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.getById(req.params.boardId, req.params.id);
  if (task.error) {
    return res.sendStatus(404).end();
  }
  res.json(task);
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.create(req.params.boardId, req.body);
  res.json(task);
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.update(
    req.params.boardId,
    req.params.id,
    req.body
  );
  res.json(task);
});

router.route('/:id').delete(async (req, res) => {
  const result = await tasksService.remove(req.params.boardId, req.params.id);
  if (result.error) {
    res.sendStatus(404).end();
  }
  res.send(result);
});

module.exports = router;
