import * as yup from 'yup';

export const createAirportSchema = yup.object().shape({
  name: yup.string().required('Required'),
  city: yup.string().required('Required'),
  country: yup.mixed().required('Required'),
  description: yup
    .string()
    .max(500, 'At most 500 characters')
    .required('Required')
});
