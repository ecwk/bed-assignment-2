const errorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError) {
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
