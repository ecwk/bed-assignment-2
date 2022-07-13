const express = require('express');

const { validateSchema } = require('../middleware');
const { AirportSchema } = require('../validations');
const { AirportModel } = require('../models');

module.exports = (database) => {
  const router = express.Router();
  const airportModel = AirportModel(database);

  router.get('/', async (req, res, next) => {
    try {
      const airports = await airportModel.findAll();
      res.status(200).json(
        airports.map((airport) => ({
          ...airport,
          description: undefined
        }))
      );
    } catch (err) {
      next(err);
    }
  });

  router.post(
    '/',
    validateSchema(AirportSchema(database)),
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
