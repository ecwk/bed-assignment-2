const express = require('express');
const createError = require('http-errors');

const { AirportModel } = require('./airport.model');
const { getFilterQueries } = require('../../common/utils');
const { AirportValidationSchema } = require('./airport.validation');
const { validateBody, protectedRoute } = require('../../common/middleware');
module.exports = (database) => {
  const router = express.Router();
  const airportModel = AirportModel(database);

  router.get('/', async (req, res, next) => {
    try {
      const airports = await airportModel.findAll(getFilterQueries(req));
      res.json({ airports });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:airportId', async (req, res, next) => {
    try {
      const airport = await airportModel.findOne(
        'airport_id',
        req.params.airportId
      );
      if (!airport) {
        return next(createError(404, 'Airport not found'));
      } else {
        res.status(200).json({ airport });
      }
    } catch (err) {
      next(err);
    }
  });

  router.post(
    '/',
    validateBody(AirportValidationSchema(database)),
    async (req, res, next) => {
      try {
        const airport = req.body;
        await airportModel.create(airport);
        res.status(204).send();
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
};
