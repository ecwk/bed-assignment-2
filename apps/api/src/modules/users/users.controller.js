const express = require('express');

const { UserValidationSchema } = require('./user.validation');
const { validateBody, protectedRoute } = require('../../common/middleware');
const { UserModel } = require('./user.model');

module.exports = (database) => {
  const router = express.Router();
  const userModel = UserModel(database);

  router.use(protectedRoute);

  router.get('/', async (req, res, next) => {
    try {
      const users = await userModel.findAll();
      res.status(200).json(
        users.map((user) => ({
          ...user,
          password: undefined
        }))
      );
    } catch (err) {
      next(err);
    }
  });

  router.get('/:userid', async (req, res, next) => {
    try {
      const user = await userModel.findOne('userid', req.params.userid);
      if (!user) {
        res.status(404).json({
          statusCode: 404,
          message: 'Not Found',
          error: 'User not found'
        });
      } else {
        res.status(200).json({
          ...user,
          password: undefined
        });
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
    '/:userid',
    validateBody(UserValidationSchema(database).update),
    async (req, res, next) => {
      try {
        const user = req.body;
        let isDuplicate = false;
        for (const field of ['username', 'email', 'contact']) {
          const duplicate = await userModel.findOne(field, user[field]);
          if (duplicate && String(duplicate.userid) !== req.params.userid) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          // Put is idempotent, i.e. put requests to the same resource should return same response
          await userModel.updateOrCreateByUserid(req.params.userid, user);
          res.status(204).send();
        } else {
          // However, if a field value is already used by another resource, it should return a 422 response
          res.status(422).json({
            statusCode: 422,
            message: 'Unprocessable Entity',
            error:
              'Username, email or contact, is already taken by another user'
          });
        }
      } catch (err) {
        next(err);
      }
    }
  );
  return router;
};
