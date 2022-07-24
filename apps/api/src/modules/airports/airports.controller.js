const express = require('express');

const { AirportValidationSchema } = require('./airport.validation');
const { validateBody, protectedRoute } = require('../../common/middleware');
const { AirportModel } = require('./airport.model');

module.exports = (database) => {
  const router = express.Router();
  const airportModel = AirportModel(database);

  router.use(protectedRoute);

  router.get('/', async (req, res, next) => {
    try {
      const airports = await airportModel.findAll();
      res.json({ airports });
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
