const router = require('express').Router();
const { toResponse } = require('./user.model');
const { taskUserIdUpadte } = require('../tasks/task.model');
const usersService = require('./user.service');
const {
  NotFoundError,
  BadRequestError
} = require('../../common/error.classes');

router.route('/').get(async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.json(users.map(user => toResponse(user)));
  } catch (e) {
    return next(new BadRequestError());
  }
});

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await usersService.getById(id);
    if (!!!user) {
      throw new NotFoundError(`User with id:${id} not found.`);
    }
    res.json(toResponse(user));
  } catch (e) {
    return next(e);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const user = await usersService.create(req.body);
    res.json(toResponse(user));
  } catch (e) {
    return next(new BadRequestError());
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersService.update(id, req.body);
    if (!!!user) {
      throw new NotFoundError(`User with id:${id} not found.`);
    }
    res.json(toResponse(user));
  } catch (e) {
    return next(e);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersService.remove(id);
    if (!!!user) {
      throw new NotFoundError(`User with id:${id} not found.`);
    }
    await taskUserIdUpadte(id);
    res.json(user);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
