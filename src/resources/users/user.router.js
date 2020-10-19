const router = require('express').Router();
const usersService = require('./user.service');
const {
  NotFoundError,
  BadRequestError
} = require('../../common/error.classes');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users);
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.json(user);
  } catch (e) {
    return next(new NotFoundError());
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const user = await usersService.create(req.body);
    res.json(user);
  } catch (e) {
    return next(new BadRequestError());
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    res.json(user);
  } catch (e) {
    return next(new NotFoundError());
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const result = await usersService.remove(req.params.id);
    res.json(result);
  } catch (e) {
    return next(new NotFoundError());
  }
});

module.exports = router;
