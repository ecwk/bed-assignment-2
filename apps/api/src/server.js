require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const passport = require('passport');
const fileUpload = require('express-fileupload');

const configurePassport = require('./configs/configure-passport');
const { errorHandler, listenCallback } = require('./utilities');
const databaseConfig = require('./configs/database');
const { protectedRoute } = require('./middleware');
const { PORT } = require('./constants');
const {
  authController,
  usersController,
  airportController,
  flightController,
  bookingController,
  uploadController
} = require('./controllers');

const startServer = async () => {
  const app = express();
  const database = await databaseConfig.getConnection();

  // Middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  configurePassport(database);
  app.use(passport.initialize());
  app.use(morgan('dev'));
  app.use(fileUpload());

  // Endpoints
  app.use('/public', express.static('./public'));
  app.use('/users', usersController(database));
  app.use(authController(database));
  app.use('/airport', airportController(database));
  app.use(flightController(database));
  app.use('/booking', bookingController(database));
  app.use('/protected', protectedRoute, (req, res) =>
    res.send('Authenticated ' + req.user.username)
  );
  app.use('/protected/*', protectedRoute, (req, res) =>
    res.send('Authenticated ' + req.user.username)
  );
  app.use('/upload', uploadController(database));
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
  const server = app.listen(PORT, listenCallback);
  return server;
};

module.exports = startServer;
