import * as yup from 'yup';
import { isValidNumberForRegion } from 'libphonenumber-js';

import { COUNTRIES } from '@common/constants';

export const editProfileSchema = (mobileCode: string) => {
  const country = COUNTRIES.find(
    (country) => country.mobileCode === mobileCode
  );

  return yup.object({
    username: yup
      .string()
      .transform((value) => {
        if (value === '') {
          return undefined;
        }
        return value;
      })
      .min(3)
      .max(20),
    email: yup
      .string()
      .nullable()
      .transform((value) => {
        if (value === '') {
          return undefined;
        }
        return value;
      })
      .email()
      .max(255),
    contact: yup
      .string()
      .transform((value: string) => {
        if (value.includes(mobileCode) || value === '') {
          return undefined;
        }
        return `${country?.mobileCode} ${value?.trim()}`;
      })
      .test(
        'isValidCountryContact',
        `Contact must be valid in ${country?.name}`,
        (value) => {
          const number = value?.replace(mobileCode, '').trim();
          if (value && number && country) {
            return isValidNumberForRegion(value, country.code);
          }
          return true;
        }
      ),
    password: yup
      .string()
      .transform((value) => {
        if (value === '') {
          return undefined;
        }
        return value;
      })
      .matches(/(?=.*[a-z]).*/, {
        message: 'Password must contain at least 1 lowercase letter'
      })
      .matches(/(?=.*[A-Z]).*/, {
        message: 'Password must contain at least 1 uppercase letter'
      })
      .matches(/(?=.*[0-9]).*/, {
        message: 'Password must contain at least 1 number'
      })
      .matches(/(?=.*[!@#$%^&*]).*/, {
        message: 'Password must contain at least 1 special character (!@#$%^&*)'
      })
      .test(
        'minimumLength',
        'Password must containt at least 8 characters',
        (value) => {
          if (value) {
            return value.length >= 8;
          }
          return true;
        }
      )
      .notRequired(),
    confirmPassword: yup
      .string()
      .transform((value) => {
        if (value === '') {
          return undefined;
        }
        return value;
      })
      .test('confirmPassword', 'Passwords must match', (value, ctx) => {
        const password = ctx.parent.password;
        if (password) {
          return value === password;
        }
        return true;
      })
  });
};
