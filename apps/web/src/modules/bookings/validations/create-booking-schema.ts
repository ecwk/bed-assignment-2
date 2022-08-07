import dayjs from 'dayjs';
import * as yup from 'yup';

export const createBookingSchema = yup.object().shape({
  name: yup.string().required('Required'),
  passport: yup.string().required('Required'),
  nationality: yup.string().required('Required'),
  age: yup
    .number()
    .min(16, 'You must be above 18 to book a flight')
    .max(200, 'Invalid age')
    .required('Required'),
  card: yup.string().required('Required'),
  cvv: yup.string().required('Required'),
  expiry: yup.string().required('Required'),
  cardName: yup.string().required('Required')
});
