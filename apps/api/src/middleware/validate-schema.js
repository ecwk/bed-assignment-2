const { ValidationError } = require('yup');

module.exports = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      let statusCode = 400;
      let message = 'Bad Request';
      if (err.inner.some((error) => error.type.match(/.+-is-unique/))) {
        statusCode = 422;
        message = 'Unprocessable Entity';
      }
      res.status(statusCode).json({
        statusCode,
        message,
        error: err.errors.map((message) => message)
      });
    } else {
      next(err);
    }
  }
};
