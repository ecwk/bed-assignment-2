const yup = require('yup');

const BookingSchema = () => {
  return yup.object({
    name: yup.string().required(),
    passport: yup.string().required(),
    nationality: yup.string().required(),
    age: yup.number().min(0).max(999).required()
  });
};

module.exports = BookingSchema;
