const express = require('express');

const { validateBody } = require('../../common/middleware');
const { FlightValidationSchema } = require('./flight.validation');
const { FlightModel } = require('./flight.model');

module.exports = (database) => {
  const router = express.Router();
  const flightModel = FlightModel(database);

  router.get('/', async (req, res, next) => {
    try {
      const flights = await flightModel.findAll();
      res.json({ flights });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/direct/:originAirportId/:destinationAirportId',
    async (req, res, next) => {
      try {
        const { originAirportId, destinationAirportId } = req.params;
        const flights = await flightModel.findAllByDirection(
          originAirportId,
          destinationAirportId
        );
        res.status(200).json({ flights });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/layover/:originAirportId/:destinationAirportId',
    async (req, res, next) => {
      try {
        const { originAirportId, destinationAirportId } = req.params;
        const flights = await flightModel.findAllTransferFlights(
          originAirportId,
          destinationAirportId
        );
        res.status(200).json(
          flights.map((flight) => ({
            ...flight,
            'Total price': Number(flight['Total price'])
          }))
        );
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validateBody(FlightValidationSchema(database)),
    async (req, res, next) => {
      try {
        const flight = req.body;
        flight.price = flight.price.toFixed(2);
        const flightid = await flightModel.create(flight);
        res.status(201).json({ flightid });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete('/:id', async (req, res, next) => {
    try {
      const { id: flightid } = req.params;
      const flight = await flightModel.findOne('flightid', flightid);
      if (!flight) {
        res.status(404).json({
          statusCode: 404,
          message: 'Not Found',
          error: 'Flight not found'
        });
      } else {
        await flightModel.deleteById(flightid);
        res.status(200).json({
          message: 'Deletion successful'
        });
      }
    } catch (err) {
      next(err);
    }
  });

  return router;
};
