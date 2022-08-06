const passport = require('passport');
const createError = require('http-errors');

const protectedRoute = (req, res, next) => {
  if (req.metadata?.isPublic) {
    next();
  } else {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) {
        next(createError(500, err));
      } else if (!user) {
        console.log('yo')
        return next(
          createError(405, 'You must be logged in to access this resource')
        );
      }
      req.user = user;
      next();
    })(req, res, next);
  }
};

module.exports = protectedRoute;
