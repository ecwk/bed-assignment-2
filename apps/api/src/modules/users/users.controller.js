const express = require('express');
const createError = require('http-errors');

const { validateBody, protectedRoute } = require('../../common/middleware');
const { UserValidationSchema } = require('./user.validation');
const { UserModel } = require('./user.model');

module.exports = (database) => {
  const router = express.Router();
  const userModel = UserModel(database);

  router.use(protectedRoute);

  router.get('/', async (req, res, next) => {
    try {
      const users = (await userModel.findAll()).map(
        ({ password, ...rest }) => rest
      );
      res.json({ users });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:userId', async (req, res, next) => {
    try {
      const user = await userModel.findOne('user_id', req.params.userId);
      if (!user) {
        return next(createError(404, 'User not found'));
      } else {
        const { password, ...rest } = user;
        res.status(200).json({ user: rest });
      }
    } catch (err) {
      next(err);
    }
  });

  router.post(
    '/',
    validateBody(UserValidationSchema(database).create),
    async (req, res, next) => {
      try {
        const user = req.body;
        const userid = await userModel.create(user);
        res.status(201).json({ userid });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:userId',
    (req, res, next) =>
      validateBody(UserValidationSchema(database, req.params.userId).update)(
        req,
        res,
        next
      ),
    async (req, res, next) => {
      try {
        const user = req.body;
        // Put is idempotent, i.e. put requests to the same resource should return same response
        await userModel.updateOrCreateByUserid(req.params.userId, user);
        res.status(204).send();
      } catch (err) {
        next(err);
      }
    }
  );
  return router;
};
