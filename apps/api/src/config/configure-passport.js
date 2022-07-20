const argon2 = require('argon2');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const { UserModel } = require('../modules/users');
const { env } = require('./env');

const localStrategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
  session: false
};

const jwtStrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.JWT_SECRET,
  ignoreExpiration: false
};

const configurePassport = (database) => {
  const userModel = UserModel(database);

  passport.use(
    new LocalStrategy(
      localStrategyOptions,
      async (username, password, done) => {
        try {
          const user = await userModel.findOne('email', username);
          if (!user) {
            return done(null, false, { message: 'Incorrect email' });
          } else if (!(await argon2.verify(user.password, password))) {
            return done(null, false, { message: 'Incorrect password' });
          } else {
            return done(null, user);
          }
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
  passport.use(
    new JwtStrategy(jwtStrategyOptions, async (jwt_payload, done) => {
      try {
        const user = await userModel.findOne('userid', jwt_payload.sub);
        if (!user) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (err) {
        return done(err, null);
      }
    })
  );
};

module.exports = { configurePassport };
