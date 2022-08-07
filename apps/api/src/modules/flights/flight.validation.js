const yup = require('yup');
const dayjs = require('dayjs');

const { FlightModel } = require('./flight.model');
const { AirportModel } = require('../airports');

const FlightValidationSchema = (database) => {
  const flightModel = FlightModel(database);
  const airportModel = AirportModel(database);

  return yup.object({
    flightCode: yup
      .string()
      .min(4, 'At least 4 characters')
      .test('flight-code-is-unique', 'Already taken', async (value) => {
        const flight = await flightModel.findOne('flight_code', value);
        return !flight;
      })
      .matches(/^[A-Z]{1,}[0-9]{1,}$/, {
        message: 'Should be in format: ABC123'
      })
      .required('Required'),
    aircraftName: yup.string().required('Required'),
    departureDate: yup
      .string()
      .test('invalid-date', 'Invalid date', (value) => {
        const date = dayjs(value);
        if (!date.isValid()) {
          return false;
        } else if (date.isBefore(dayjs())) {
          return false;
        } else {
          return true;
        }
      })
      .transform((value) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
      })
      .required(),
    originAirportId: yup
      .number()
      .test('originAirport-exists', 'Does not exist', async (value) => {
        const airport = await airportModel.findOne('airport_id', value);
        return !!airport;
      })
      .required('Required'),
    destinationAirportId: yup
      .number()
      .test('destinationAirport-exists', 'Does not exist', async (value) => {
        const airport = await airportModel.findOne('airport_id', value);
        return !!airport;
      })
      .required(),
    travelTime: yup
      .string()
      .matches(/^\d{1,2} hours \d{1,2} mins$/, {
        message: 'travelTime is invalid, should be in format: H hours M mins'
      })
      .required(),
    price: yup
      .mixed()
      .test('required', 'Required', Boolean)
      .test('minPrice', 'More than 0', (value) => Number(value) > 0)
      .test(
        'maxPrice',
        'Less than 1,000,000',
        (value) => Number(value) < 1000000
      )
      .transform((value) => Number(value).toFixed(2)),
    imageUrl: yup
      .string()
      .nullable()
      .url()
      .transform((value) => {
        if (value) {
          return value;
        }
        return null;
      })
  });
};

module.exports = { FlightValidationSchema };
