const passport = require('passport');

const protectedRoute = (req, res, next) => {
  if (req.metadata?.isPublic) {
    next();
  } else {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({
          statusCode: 401,
          message: 'Unauthorized',
          error: 'You must be logged in to access this resource'
        });
      }
      req.user = user;
      next();
    })(req, res, next);
  }
};

module.exports = protectedRoute;
