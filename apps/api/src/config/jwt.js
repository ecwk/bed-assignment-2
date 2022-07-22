const jwt = require('jsonwebtoken');

const { env } = require('../config');

module.exports = {
  signUser: (user) =>
    jwt.sign(
      {
        username: user.username,
        email: user.email
      },
      env.JWT_SECRET,
      {
        subject: String(user.userId),
        expiresIn: env.JWT_EXPIRATION
      }
    )
};
