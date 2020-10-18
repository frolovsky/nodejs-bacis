const removePasswordFromResponse = res => {
  if (Object.prototype.hasOwnProperty.call(res, 'password')) {
    delete res.password;
  }
  return res;
};

module.exports = { removePasswordFromResponse };
