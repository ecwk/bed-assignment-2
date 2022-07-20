const { validateBody } = require('./validate-body');

module.exports = {
  validateBody,
  protectedRoute: require('./protected-route')
};
