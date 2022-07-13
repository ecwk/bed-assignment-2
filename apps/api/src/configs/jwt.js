const jwt = require('jsonwebtoken');

const constants = require('../constants');

module.exports = {
  signUser: (user) =>
    jwt.sign(
      {
        username: user.username,
        email: user.email
      },
      constants.JWT_SECRET,
      {
        subject: String(user.userid),
        expiresIn: constants.JWT_EXPIRATION
      }
    )
};
