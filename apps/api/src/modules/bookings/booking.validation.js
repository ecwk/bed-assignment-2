const yup = require('yup');

const BookingValidationSchema = () => {
  return yup.object({
    name: yup.string().required('Required'),
    passport: yup.string().required('Required'),
    nationality: yup.string().required('Required'),
    age: yup
      .number()
      .min(16, 'You must be above 18 to book a flight')
      .max(200, 'Invalid age')
      .required('Required')
  });
};

module.exports = { BookingValidationSchema };
