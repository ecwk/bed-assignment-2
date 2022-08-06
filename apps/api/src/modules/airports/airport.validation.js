const yup = require('yup');

const { AirportModel } = require('./airport.model');

const AirportValidationSchema = (database) => {
  const airportModel = AirportModel(database);

  return yup.object({
    name: yup
      .string()
      .test(
        'name-is-unique',
        '${value} has already been registered',
        async (value) => {
          const airport = await airportModel.findOne('name', value);
          return !airport;
        }
      )
      .required('Required'),
    country: yup.string().required('Required'),
    city: yup.string().required('Required'),
    description: yup.string().required('Required')
  });
};

module.exports = { AirportValidationSchema };
