const maskPasswordFromRequest = body => {
  if (Object.prototype.hasOwnProperty.call(body, 'password')) {
    body.password = '*'.repeat(String(body.password).length);
  }
  return body;
};

module.exports = { maskPasswordFromRequest };
