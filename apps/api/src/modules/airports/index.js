const { AirportModel, AIRPORT_SELECT } = require('./airport.model');

module.exports = {
  airportsController: require('./airports.controller'),
  AirportModel,
  AIRPORT_SELECT
};
