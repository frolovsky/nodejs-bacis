const express = require('express');
const app = express();

const NOT_FOUND_ERROR = app.use('/', (err, req, res) => {
  console.log('error');
  res.status(404).send(err);
});

module.exports = { NOT_FOUND_ERROR };
