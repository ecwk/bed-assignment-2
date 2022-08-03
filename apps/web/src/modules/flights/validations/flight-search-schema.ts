import * as yup from 'yup';

export const flightSearchSchema = yup.object({
  from: yup.string().required('Required'),
  to: yup.string().required('Required'),
  departureDate: yup
    .string()
    .transform((value) => {
      if (value) {
        return new Date(value).toLocaleDateString();
      }
      return value;
    })
    .required('Required'),
  returnDate: yup
    .string()
    .nullable()
    .test('isRequired', 'Required', (value, ctx) => {
      const isTwoWay = ctx.parent.isTwoWay;
      if (isTwoWay) {
        return !!value;
      }
      return true;
    })
    .transform((value) => {
      if (value) {
        return new Date(value).toLocaleDateString();
      }
      return value;
    }),
  isTwoWay: yup.boolean().required('Required')
});
