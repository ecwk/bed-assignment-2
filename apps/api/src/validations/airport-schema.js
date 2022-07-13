const yup = require('yup');

const { AirportModel } = require('../models');

const AirportSchema = (database) => {
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
      .required(),
    country: yup.string().required(),
    description: yup.string().required()
  });
};

module.exports = AirportSchema;
