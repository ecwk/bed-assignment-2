const express = require('express');
const passport = require('passport');
const createError = require('http-errors');

const { validateBody, protectedRoute } = require('../../common/middleware');
const { SignupValidationSchema } = require('./auth.validation');
const { UserModel } = require('../users');
const jwt = require('../../config/jwt');

module.exports = (database) => {
  const router = express.Router();
  const userModel = UserModel(database);

  router.get('/whoami', protectedRoute, (req, res) => {
    res.json({ user: req.user });
  });

  router.post('/login', (req, res, next) => {
    passport.authenticate('local', { sesion: false }, (err, user) => {
      if (err) {
        next(createError(500, err));
      } else if (!user) {
        return next(createError(401, 'Incorrect username or password'));
      } else
        res.json({
          token: jwt.signUser(user)
        });
    })(req, res, next);
  });

  router.post(
    '/signup',
    validateBody(SignupValidationSchema(database)),
    async (req, res, next) => {
      try {
        const user = req.body;
        const userid = await userModel.create({ ...user, role: 'Customer' });
        res.status(201).json({ user: { userid } });
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
};
