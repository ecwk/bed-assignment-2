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
      .min(3, 'At least 3 characters')
      .max(20, 'Cannot exceed 20 characters'),
    email: yup
      .string()
      .transform((value) => {
        if (value === '') {
          return undefined;
        }
        return value;
      })
      .email('Invalid email')
      .max(255),
    contact: yup
      .string()
      .transform((value: string) => {
        const mobileCode_ = value.match(/^\+[\d-]+(?=\s)/);
        if (value === '') {
          return undefined;
        } else if (mobileCode_) {
          return value;
        }
        return `${country?.mobileCode} ${value?.trim()}`;
      })
      .test(
        'isValidCountryContact',
        `Invalid ${country?.name} phone number`,
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
        message: 'At least 1 lowercase letter'
      })
      .matches(/(?=.*[A-Z]).*/, {
        message: 'At least 1 uppercase letter'
      })
      .matches(/(?=.*[0-9]).*/, {
        message: 'At least 1 number'
      })
      .matches(/(?=.*[!@#$%^&*]).*/, {
        message: 'At least 1 special character (!@#$%^&*)'
      })
      .test('minimumLength', 'At least 8 characters', (value) => {
        if (value) {
          return value.length >= 8;
        }
        return true;
      }),
    confirmPassword: yup
      .string()
      .transform((value) => {
        if (value === '') {
          return undefined;
        }
        return value;
      })
      .test('confirmPassword', "Doesn't must match", (value, ctx) => {
        const password = ctx.parent.password;
        if (password) {
          return value === password;
        }
        return true;
      })
  });
};
