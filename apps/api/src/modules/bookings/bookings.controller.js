const express = require('express');

const { BookingValidationSchema } = require('./booking.validation');
const { validateBody } = require('../../common/middleware');
const { BookingModel, BOOKING_SELECT } = require('./booking.model');
const { FlightModel } = require('../flights');
const { UserModel } = require('../users');
const { getFilterQueries } = require('../../common/utils');

const DEFAULT_KEYS = ['name'];

module.exports = (database) => {
  const router = express.Router();
  const bookingModel = BookingModel(database);
  const userModel = UserModel(database);
  const flightModel = FlightModel(database);

  router.get('/', async (req, res, next) => {
    try {
      const bookings = await bookingModel.findAll(
        getFilterQueries(req, {
          availableKeys: BOOKING_SELECT,
          keys: DEFAULT_KEYS
        })
      );
      res.json({ bookings });
    } catch (err) {
      next(err);
    }
  });
  router.get('/:userId', async (req, res, next) => {
    try {
      const { userId } = req.params;
      const bookings = await bookingModel.findUserBookings(
        userId,
        getFilterQueries(req, {
          availableKeys: BOOKING_SELECT,
          keys: DEFAULT_KEYS
        })
      );
      res.json({ bookings });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:userId/count', async (req, res, next) => {
    try {
      const { userId } = req.params;
      const count = await bookingModel.countOne(
        'user_id',
        userId,
        getFilterQueries(req)
      );
      res.json({ count });
    } catch (err) {
      next(err);
    }
  });

  router.post(
    '/:userid/:flightid',
    validateBody(BookingValidationSchema()),
    async (req, res, next) => {
      try {
        const { userid, flightid } = req.params;
        const user = await userModel.findOne('user_id', userid);
        const flight = await flightModel.findOne('flight_id', flightid);
        if (!user) {
          res.status(404).json({
            statusCode: 404,
            message: 'Not Found',
            error: `User with id ${userid} not found`
          });
        } else if (!flight) {
          res.status(404).json({
            statusCode: 404,
            message: 'Not Found',
            error: `Flight with id ${flightid} not found`
          });
        } else {
          const booking = req.body;
          const bookingId = await bookingModel.create(
            booking,
            userid,
            flightid
          );
          const createdBooking = await bookingModel.findOne(
            'booking_id',
            bookingId,
            getFilterQueries(req)
          );
          res.status(201).send({ booking: createdBooking });
        }
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
};
