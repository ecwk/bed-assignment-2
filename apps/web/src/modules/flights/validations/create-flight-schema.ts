import dayjs from 'dayjs';
import * as yup from 'yup';

export const createFlightSchema1 = yup.object().shape({
  originAirportId: yup.mixed().transform(Number).required('Required'),
  destinationAirportId: yup.mixed().transform(Number).required('Required')
});

export const createFlightSchema = yup.object().shape({
  originAirportId: yup.mixed().transform(Number).required('Required'),
  destinationAirportId: yup.mixed().transform(Number).required('Required'),
  flightCode: yup
    .string()
    .required('Required')
    .min(4, 'At least 4 characters')
    .matches(/^[A-Z]{1,}[0-9]{1,}$/, {
      message: 'Should be in format: ABC123'
    }),
  aircraftName: yup.string().required('Required'),
  price: yup
    .mixed()
    .test('required', 'Required', Boolean)
    .test('minPrice', 'More than 0', (value: number) => value > 0)
    .test('maxPrice', 'Less than 1,000,000', (value) => value < 1000000)
    .test('decimal', 'Up to 2 decimal places', (value?: number) => {
      const decimal = value?.toString().split('.')[1];
      return decimal ? decimal.length <= 2 : true;
    })
    .transform(Number),
  departureTime: yup
    .string()
    .test('valid-time', 'Cannot be before now', (value, ctx) => {
      const selectedDateTime = dayjs(ctx.parent.departureDate)
        .set('hours', Number(value?.split(':')?.[0]) || 0)
        .set('minutes', Number(value?.split(':')?.[1]) || 0);
      const today = dayjs();
      return selectedDateTime.isAfter(today);
    })
    .required('Required'),
  departureDate: yup
    .string()
    .when(['departureTime'], (departureTime, schema) => {
      return schema.transform((value: Date) => {
        return dayjs(value)
          .set('hours', departureTime.split(':')[0])
          .set('minutes', departureTime.split(':')[1])
          .format('YYYY-MM-DD HH:mm:ss');
      });
    })
    .required('Required'),
  hours: yup
    .mixed()
    .test('required', 'Required', Boolean)
    .test('minHours', 'Cannot be negative', (value) => Number(value) >= 0)
    .test('maxHours', 'Less than 24', (value) => Number(value) <= 24)
    .test('decimal', 'Cannot be decimal', (value) => Number(value) % 1 === 0)
    .transform(Number),

  minutes: yup
    .mixed()
    .test('required', 'Required', Boolean)
    .test('minMinutes', 'Cannot be negative', (value) => Number(value) >= 0)
    .test('maxMinutes', 'Less than 60', (value) => Number(value) <= 60)
    .test('decimal', 'Cannot be decimal', (value) => Number(value) % 1 === 0)
    .transform(Number)
});
