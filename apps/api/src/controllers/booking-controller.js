const express = require('express');

const { validateSchema } = require('../middleware');
const { BookingSchema } = require('../validations');
const { BookingModel, UserModel, FlightModel } = require('../models');

module.exports = (database) => {
  const router = express.Router();
  const bookingModel = BookingModel(database);
  const userModel = UserModel(database);
  const flightModel = FlightModel(database);

  router.post(
    '/:userid/:flightid',
    validateSchema(BookingSchema()),
    async (req, res, next) => {
      try {
        const { userid, flightid } = req.params;
        const user = await userModel.findOne('userid', userid);
        const flight = await flightModel.findOne('flightid', flightid);
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
          res.status(201).send({ bookingId });
        }
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
};
