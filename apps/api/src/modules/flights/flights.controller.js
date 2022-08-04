const dayjs = require('dayjs');
const express = require('express');

const { FlightModel } = require('./flight.model');
const { validateBody } = require('../../common/middleware');
const { FlightValidationSchema } = require('./flight.validation');
const { DATE_FORMAT } = require('../../common/constants');

module.exports = (database) => {
  const router = express.Router();
  const flightModel = FlightModel(database);

  router.get('/', async (req, res, next) => {
    const page =
      Number(req.query.page) >= 1 ? Number(req.query.page) : undefined;
    const limit =
      Number(req.query.limit) >= 1 ? Number(req.query.limit) : undefined;

    try {
      const flights = await flightModel.findAll(page, limit);
      res.json({ flights });
    } catch (err) {
      next(err);
    }
  });

  router.get('/count', async (req, res, next) => {
    try {
      const flights = await flightModel.findAll(1, 999999999);
      res.json({ count: flights.length });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    '/direct/:originAirportId/:destinationAirportId',
    async (req, res, next) => {
      const dateFilterType = req.query?.dateFilterType || 'none';
      let dateFrom, dateTo;

      switch (dateFilterType) {
        case 'none':
          dateFrom = '';
          dateTo = '';
          break;
        case 'exact':
          dateFrom = req.query.date;
          dateTo = req.query.date;
          break;
        case 'range':
          dateFrom = req.query.dateFrom;
          dateTo = req.query.dateTo;
          break;
      }

      if (dateFilterType !== 'none') {
        dateFrom = dayjs(dateFrom)
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0)
          .format(DATE_FORMAT);
        dateTo = dayjs(dateTo)
          .set('hour', 23)
          .set('minute', 59)
          .set('second', 59)
          .format(DATE_FORMAT);
      }

      const page = Number(req.query.page) >= 1 ? Number(req.query.page) : 1;
      const limit = Number(req.query.limit) >= 1 ? Number(req.query.limit) : 50;

      try {
        const { originAirportId, destinationAirportId } = req.params;
        const flights = await flightModel.findDirectFlights(
          originAirportId,
          destinationAirportId,
          dateFrom,
          dateTo,
          page,
          limit
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
