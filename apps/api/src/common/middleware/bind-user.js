const passport = require('passport');
const createError = require('http-errors');

const bindUser = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      next(createError(500, err));
    }
    req.user = user;
    req.isAdmin = user && user.role === 'admin';
    next();
  })(req, res, next);
};

module.exports = bindUser;
