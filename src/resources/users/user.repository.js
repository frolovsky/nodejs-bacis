const { User } = require('./user.model');

const getAll = async () => User.find({});

const getById = async id => User.findById(id);

const create = async user => User.create(user);

const update = async (id, data) => User.findByIdAndUpdate(id, data);

const remove = async id => User.findByIdAndDelete(id);

module.exports = { getAll, getById, create, update, remove };
