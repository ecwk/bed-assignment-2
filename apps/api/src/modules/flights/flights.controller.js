const dayjs = require('dayjs');
const express = require('express');
const createError = require('http-errors');

const { FlightModel, FLIGHT_SELECT } = require('./flight.model');
const { validateBody } = require('../../common/middleware');
const { getFilterQueries } = require('../../common/utils');
const { FlightValidationSchema } = require('./flight.validation');
const { DATE_FORMAT } = require('../../common/constants');

const DEFAULT_KEYS = [
  'flightCode',
  'originAirportName',
  'originAirportCountry',
  'originAirportCity',
  'destinationAirportName',
  'destinationAirportCountry',
  'destinationAirportCity'
];

module.exports = (database) => {
  const router = express.Router();
  const flightModel = FlightModel(database);

  router.get('/', async (req, res, next) => {
    try {
      const flights = await flightModel.findAll(
        getFilterQueries(req, {
          availableKeys: FLIGHT_SELECT,
          keys: DEFAULT_KEYS
        })
      );
      res.json({ flights });
    } catch (err) {
      next(err);
    }
  });

  router.get('/count', async (req, res, next) => {
    const filterQueries = getFilterQueries(req);
    filterQueries.exclude = Object.keys(FLIGHT_SELECT).slice(0, -1);

    try {
      const flights = await flightModel.findAll(filterQueries);
      res.json({ count: flights.length });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:flightId', async (req, res, next) => {
    try {
      const flight = await flightModel.findOne(
        'flight_id',
        req.params.flightId,
        getFilterQueries(req)
      );
      if (!flight) {
        return next(createError(404, 'Flight not found'));
      } else {
        res.status(200).json({ flight });
      }
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
        const flightId = await flightModel.create(flight);
        const createdFlight = await flightModel.findOne(
          'flight_id',
          flightId,
          getFilterQueries(req)
        );
        res.status(201).json({ flight: createdFlight });
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
