const express = require('express');
const createError = require('http-errors');

const { validateBody, protectedRoute } = require('../../common/middleware');
const { UserValidationSchema } = require('./user.validation');
const { UserModel, USER_SELECT } = require('./user.model');
const { getFilterQueries } = require('../../common/utils');

module.exports = (database) => {
  const router = express.Router();
  const userModel = UserModel(database);

  router.use(protectedRoute);

  router.get('/', async (req, res, next) => {
    const filterQueries = getFilterQueries(req);
    filterQueries.exclude = [
      ...filterQueries.exclude,
      ...(req.isAdmin ? [] : ['password'])
    ];

    try {
      const users = await userModel.findAll(filterQueries);
      res.json({ users });
    } catch (err) {
      next(err);
    }
  });

  router.get('/count', async (req, res, next) => {
    const filterQueries = getFilterQueries(req);
    filterQueries.exclude = Object.keys(USER_SELECT).slice(0, -1);

    try {
      const users = await userModel.findAll(filterQueries);
      res.json({ count: users.length });
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

  router.patch(
    '/:userId',
    (req, res, next) =>
      validateBody(UserValidationSchema(database, req.params.userId).patch)(
        req,
        res,
        next
      ),
    async (req, res, next) => {
      const user = req.body;
      const patchedUserId = await userModel.patchByUserid(
        req.params.userId,
        user
      );
      if (patchedUserId === 0) {
        return next(createError(404, 'User not found'));
      }
      const patchedUser = await userModel.findOne('user_id', req.params.userId);
      res.status(200).json({ user: patchedUser });
    }
  );

  return router;
};
