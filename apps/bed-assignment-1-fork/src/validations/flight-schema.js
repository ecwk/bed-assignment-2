const yup = require('yup');

const { FlightModel, AirportModel } = require('../models');

const FlightSchema = (database) => {
  const flightModel = FlightModel(database);
  const airportModel = AirportModel(database);

  return yup.object({
    flightCode: yup
      .string()
      .test(
        'flight-code-is-unique',
        '${value} is already taken',
        async (value) => {
          const flight = await flightModel.findOne('flightCode', value);
          return !flight;
        }
      )
      .matches(/^[A-Z]{1,}[0-9]{1,}$/, {
        message: 'flightCode is invalid, should be in format: ABC123'
      })
      .required(),
    aircraft: yup.string().required(),
    originAirport: yup
      .number()
      .test(
        'originAirport-exists',
        'originAirport does not exist',
        async (value) => {
          const airport = await airportModel.findOne('airportId', value);
          return !!airport;
        }
      )
      .required(),
    destinationAirport: yup
      .number()
      .test(
        'destinationAirport-exists',
        'destinationAirport does not exist',
        async (value) => {
          const airport = await airportModel.findOne('airportid', value);
          return !!airport;
        }
      )
      .required(),
    embarkDate: yup
      .string()
      .matches(/^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/, {
        message: 'embarkDate is invalid, should be in format: YYYY/MM/DD HH:MM'
      })
      .required(),
    travelTime: yup
      .string()
      .matches(/^\d{1,2} hours \d{1,2} mins$/, {
        message: 'travelTime is invalid, should be in format: H hours M mins'
      })
      .required(),
    price: yup.number().min(0).max(1000000).required()
  });
};

module.exports = FlightSchema;
