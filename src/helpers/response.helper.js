const maskPasswordFromRequest = body => {
  const responeBody = Object.assign({}, body);
  if (Object.prototype.hasOwnProperty.call(body, 'password')) {
    responeBody.password = '*'.repeat(String(responeBody.password).length);
  }
  return responeBody;
};

module.exports = { maskPasswordFromRequest };
