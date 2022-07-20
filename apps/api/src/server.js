require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const passport = require('passport');
const fileUpload = require('express-fileupload');

const { configurePassport } = require('./config/configure-passport');
const { errorHandler, listenCallback } = require('./common/utils');
const { airportsController } = require('./modules/airports');
const { bookingsController } = require('./modules/bookings');
const { uploadsController } = require('./modules/uploads');
const { flightsController } = require('./modules/flights');
const { protectedRoute } = require('./common/middleware');
const { usersController } = require('./modules/users');
const { authController } = require('./modules/auth');
const databaseConfig = require('./config/database');
const { env } = require('./config');

const startServer = async () => {
  const app = express();
  const database = await databaseConfig.getConnection();

  // Middleware
  app.use(express.json());
  configurePassport(database);
  app.use(passport.initialize());
  app.use(morgan('dev'));
  app.use(fileUpload());

  // Endpoints
  app.use('/public', express.static('./public'));
  app.use('/users', usersController(database));
  app.use('/auth', authController(database));
  app.use('/airports', airportsController(database));
  app.use('/flights', flightsController(database));
  app.use('/bookings', bookingsController(database));
  app.use('/uploads', uploadsController(database));
  app.use('*', (req, res) => {
    res.status(404).json({
      statusCode: 404,
      message: 'Not Found',
      error: `${req.method} ${req.baseUrl || '/'} not found`
    });
  });

  // Error Handler
  app.use(errorHandler);

  // Start Server
  const server = app.listen(env.PORT, listenCallback);
  return server;
};

module.exports = { startServer };
