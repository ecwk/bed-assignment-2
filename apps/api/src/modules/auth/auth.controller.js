const express = require('express');
const passport = require('passport');
const createError = require('http-errors');

const { protectedRoute } = require('../../common/middleware');
const jwt = require('../../config/jwt');

module.exports = () => {
  const router = express.Router();

  router.get('/whoami', protectedRoute, (req, res) => {
    res.json(req.user);
  });

  router.post('/login', (req, res, next) => {
    passport.authenticate('local', { sesion: false }, (err, user) => {
      if (err) {
        next(createError(500, err));
      } else if (!user) {
        return next(createError(401, 'Incorrect username or password'));
      } else
        res.json({
          user: user,
          token: jwt.signUser(user)
        });
    })(req, res, next);
  });

  return router;
};
