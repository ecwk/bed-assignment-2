const yup = require('yup');
const { isValidNumberForRegion } = require('libphonenumber-js');

const { COUNTRIES, ROLES } = require('../../common/constants');
const { UserModel } = require('./user.model');

const UserValidationSchema = (database, userId) => {
  const userModel = UserModel(database);

  const create = yup.object({
    username: yup
      .string()
      .test(
        'username-is-unique',
        'Username is already taken',
        async (value) => {
          const user = await userModel.findOne('username', value);
          return !user;
        }
      )
      .required('Username must be defined'),
    email: yup
      .string()
      .email('Email must be a valid email')
      .test('email-is-unique', 'Email is already taken', async (value) => {
        const user = await userModel.findOne('email', value);
        return !user;
      })
      .required('Email must be defined'),
    contact: yup
      .string()
      .test('contact-is-unique', 'Contact is already taken', async (value) => {
        const user = await userModel.findOne('contact', value);
        return !user;
      })
      .test(
        'isValidContactFormat',
        'Contact must follow the format: +[code] [number]',
        (value) => {
          const mobileCode = value?.match(/^\+.+(?=\s)/)?.[0];
          const phoneNumber = value?.replace(mobileCode, '').trim();
          if (!(mobileCode && phoneNumber)) {
            return false;
          }
          return true;
        }
      )
      .test(
        'isValidContact',
        'Contact must be a valid number',
        async (value) => {
          const mobileCode = value?.match(/^\+.+(?=\s)/)?.[0];
          const phoneNumber = value?.replace(mobileCode, '').trim();
          const country = COUNTRIES.find(
            (country) => mobileCode === country.mobileCode
          );
          if (!country) {
            return false;
          }
          return isValidNumberForRegion(phoneNumber, country.code);
        }
      )
      .required('Contact must be defined'),
    password: yup
      .string()
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
        'Password must contain at least 8 characters',
        (value) => {
          if (value) {
            return value.length >= 8;
          } else {
            return true;
          }
        }
      )
      .required('Password must be defined'),
    role: yup
      .string('Role must be a string')
      .oneOf(
        Object.values(ROLES),
        `Role must be [${Object.values(ROLES).join(', ')}]`
      )
      .required('Role must be defined'),
    profilePicUrl: yup
      .string()
      .url('profilePicUrl must be a valid URL')
      .notRequired()
  });

  const update = yup
    .object({
      username: yup
        .string()
        .test(
          'username-is-unique',
          'Username is already taken',
          async (value) => {
            const user = await userModel.findOne('username', value);
            if (user && user.userId !== Number(userId)) {
              return false;
            }
            return true;
          }
        )
        .required('Username must be defined'),
      email: yup
        .string()
        .email('Email must be a valid email')
        .test('email-is-unique', 'Email is already taken', async (value) => {
          const user = await userModel.findOne('email', value);
          if (user && user.userId !== Number(userId)) {
            return false;
          }
          return true;
        })
        .required('Email must be defined'),
      contact: yup
        .string()
        .test(
          'contact-is-unique',
          'Contact is already taken',
          async (value) => {
            const user = await userModel.findOne('contact', value);
            if (user && user.userId !== Number(userId)) {
              return false;
            }
            return true;
          }
        )
        .test(
          'isValidContactFormat',
          'Contact must follow the format: +[code] [number]',
          (value) => {
            const mobileCode = value?.match(/^\+.+(?=\s)/)?.[0];
            const phoneNumber = value?.replace(mobileCode, '').trim();
            if (!(mobileCode && phoneNumber)) {
              return false;
            }
            return true;
          }
        )
        .test(
          'isValidContact',
          'Contact must be a valid number',
          async (value) => {
            const mobileCode = value?.match(/^\+.+(?=\s)/)?.[0];
            const phoneNumber = value?.replace(mobileCode, '').trim();
            const country = COUNTRIES.find(
              (country) => mobileCode === country.mobileCode
            );
            if (!country) {
              return false;
            }
            return isValidNumberForRegion(phoneNumber, country.code);
          }
        )
        .required('Contact must be defined'),
      password: yup
        .string()
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
          message:
            'Password must contain at least 1 special character (!@#$%^&*)'
        })
        .test(
          'minimumLength',
          'Password must contain at least 8 characters',
          (value) => {
            if (value) {
              return value.length >= 8;
            } else {
              return true;
            }
          }
        )
        .required('Password must be defined'),
      role: yup
        .string()
        .oneOf(
          Object.values(ROLES),
          `Role must be [${Object.values(ROLES).join(', ')}]`
        )
        .required('Role must be defined'),
      profilePicUrl: yup
        .string()
        .url('profilePicUrl must be a valid URL')
        .notRequired()
    })
    .strict(true)
    .noUnknown(true, 'No unknown fields are allowed');

  const patch = yup
    .object({
      username: yup
        .string()
        .test(
          'username-is-unique',
          'Username is already taken',
          async (value) => {
            const user = await userModel.findOne('username', value);
            if (user && user.userId !== Number(userId)) {
              return false;
            }
            return true;
          }
        )
        .notRequired(),
      email: yup
        .string()
        .email('Email must be a valid email')
        .test('email-is-unique', 'Email is already taken', async (value) => {
          const user = await userModel.findOne('email', value);
          if (user && user.userId !== Number(userId)) {
            return false;
          }
          return true;
        })
        .notRequired(),
      contact: yup
        .string()
        .test(
          'contact-is-unique',
          'Contact is already taken',
          async (value) => {
            if (value) {
              const user = await userModel.findOne('contact', value);
              if (user && user.userId !== Number(userId)) {
                return false;
              }
            }
            return true;
          }
        )
        .test(
          'isValidContactFormat',
          'Contact must follow the format: +[code] [number]',
          (value) => {
            if (value) {
              const mobileCode = value?.match(/^\+.+(?=\s)/)?.[0];
              const phoneNumber = value?.replace(mobileCode, '').trim();
              if (!(mobileCode && phoneNumber)) {
                return false;
              }
            }
            return true;
          }
        )
        .test(
          'isValidContact',
          'Contact must be a valid number',
          async (value) => {
            if (value) {
              const mobileCode = value?.match(/^\+.+(?=\s)/)?.[0];
              const phoneNumber = value?.replace(mobileCode, '').trim();
              const country = COUNTRIES.find(
                (country) => mobileCode === country.mobileCode
              );
              if (!country) {
                return false;
              }
              return isValidNumberForRegion(phoneNumber, country.code);
            }
            return true;
          }
        )
        .notRequired(),
      password: yup
        .string()
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
          message:
            'Password must contain at least 1 special character (!@#$%^&*)'
        })
        .test(
          'minimumLength',
          'Password must contain at least 8 characters',
          (value) => {
            if (value) {
              return value.length >= 8;
            } else {
              return true;
            }
          }
        )
        .notRequired(),
      role: yup
        .string()
        .oneOf(
          Object.values(ROLES),
          `Role must be [${Object.values(ROLES).join(', ')}]`
        )
        .notRequired(),
      profilePicUrl: yup
        .string()
        .url('profilePicUrl must be a valid URL')
        .notRequired()
    })
    .strict(true)
    .noUnknown(true, 'No unknown fields are allowed');

  return {
    create,
    update,
    patch
  };
};

module.exports = { UserValidationSchema };
