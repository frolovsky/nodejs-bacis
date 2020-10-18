const {
  removePasswordFromResponse
} = require('../validators/response.validator');
module.exports = (req, res, next) => {
  const { method, query } = req;
  const body = removePasswordFromResponse(req.body);
  console.log(
    `Incoming request: METHOD - ${method} 
    >>> url: ${req.protocol}://${req.headers.host}${req._parsedUrl.pathname} 
    >>> query: ${JSON.stringify(query)} 
    >>> body: ${JSON.stringify(body)}
    >>> Full URL with query: ${req.protocol}://${req.headers.host}${req.url}`
  );
  next();
};
