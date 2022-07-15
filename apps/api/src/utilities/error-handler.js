const { HttpError } = require('http-errors');

const HTTP_ERROR_CODES = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  408: 'Request Timeout',
  409: 'Conflict',
  500: 'Internal Server Error'
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    if (err.expose) {
      res.json({
        statusCode: err.statusCode,
        error: HTTP_ERROR_CODES[err.statusCode || 400]
      });
    } else {
      res.json({
        statusCode: 500,
        error: HTTP_ERROR_CODES[500],
        foo: 'bar'
      });
      console.error(err);
    }
  } else if (err instanceof SyntaxError) {
    res.status(400).send({ error: 'Bad Request' });
  } else {
    if (!res.headersSent) {
      res.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error',
        error: err.message
      });
    }
    console.error(err);
  }
};

module.exports = errorHandler;
