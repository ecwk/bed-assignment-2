const { HttpError } = require('http-errors');

const { HTTP_ERROR_CODES } = require('../constants');

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError && err.expose) {
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: HTTP_ERROR_CODES[err.statusCode || 400],
      error: err.message
    });
  } else if (err instanceof SyntaxError) {
    res.status(400).send({ error: 'Bad Request' });
  } else {
    if (!res.headersSent) {
      res.status(500).json({
        statusCode: 500,
        message: HTTP_ERROR_CODES[500],
        error: err.message
      });
    }
    console.error(err);
  }
};

module.exports = errorHandler;
