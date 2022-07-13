const express = require('express');
const passport = require('passport');

const jwt = require('../configs/jwt');

module.exports = () => {
  const router = express.Router();

  router.post('/login', (req, res, next) => {
    passport.authenticate(
      'local',
      {
        session: false
      },
      (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).json({
            statusCode: 401,
            message: 'Unauthorized',
            error: 'Incorrect username or password'
          });
        }
        return res.json({
          statusCode: 200,
          message: 'Success',
          token: jwt.signUser(user)
        });
      }
    )(req, res, next);
  });

  return router;
};
