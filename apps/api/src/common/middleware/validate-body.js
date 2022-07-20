const { ValidationError } = require('yup');

const validateBody = (validationSchema) => async (req, res, next) => {
  try {
    await validationSchema.validate(req.body, { abortEarly: false });
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

module.exports = { validateBody };
