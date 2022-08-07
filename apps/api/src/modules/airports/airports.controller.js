const express = require('express');
const createError = require('http-errors');

const { AirportModel } = require('./airport.model');
const { getFilterQueries } = require('../../common/utils');
const { AirportValidationSchema } = require('./airport.validation');
const { validateBody, protectedRoute } = require('../../common/middleware');
const { AIRPORT_SELECT } = require('./airport.model');

const DEFAULT_KEYS = ['name', 'country', 'city'];

module.exports = (database) => {
  const router = express.Router();
  const airportModel = AirportModel(database);

  router.get('/', async (req, res, next) => {
    try {
      const airports = await airportModel.findAll(
        getFilterQueries(req, {
          availableKeys: AIRPORT_SELECT,
          keys: DEFAULT_KEYS
        })
      );
      res.json({ airports });
    } catch (err) {
      next(err);
    }
  });

  router.get('/count', async (req, res, next) => {
    const filterQueries = getFilterQueries(req, {
      availableKeys: AIRPORT_SELECT,
      keys: DEFAULT_KEYS
    });
    filterQueries.exclude = Object.keys(AIRPORT_SELECT).slice(0, -1);

    try {
      const airports = await airportModel.findAll(filterQueries);
      res.json({ count: airports.length });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:airportId', async (req, res, next) => {
    try {
      const airport = await airportModel.findOne(
        'airport_id',
        req.params.airportId,
        getFilterQueries(req, {
          availableKeys: AIRPORT_SELECT,
          keys: DEFAULT_KEYS
        })
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
        const airportId = await airportModel.create(airport);
        const createdAirport = await airportModel.findOne(
          'airport_id',
          airportId,
          getFilterQueries(req)
        );
        res.status(201).json({ airport: createdAirport });
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
};
