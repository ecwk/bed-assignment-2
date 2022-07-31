const { ValidationError } = require('yup');

const { HTTP_ERROR_CODES } = require('../constants');

const validateBody = (validationSchema) => async (req, res, next) => {
  try {
    const res = await validationSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    req.body = res;
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      const errors = err.inner.map((error) => [error.path, error.errors[0]]);
      res.status(400).json({
        statusCode: 400,
        message: HTTP_ERROR_CODES[400],
        errors: Object.fromEntries(errors)
      });
    } else {
      next(err);
    }
  }
};

module.exports = { validateBody };
