const yup = require('yup');

const { UserModel } = require('../models');

const UserSchema = (database) => {
  const userModel = UserModel(database);

  const create = yup.object({
    username: yup
      .string()
      .test(
        'username-is-unique',
        '${value} is already taken',
        async (value) => {
          const user = await userModel.findOne('username', value);
          return !user;
        }
      )
      .required(),
    email: yup
      .string()
      .email()
      .test(
        'email-is-unique',
        '${value} has already been registered',
        async (value) => {
          const user = await userModel.findOne('email', value);
          return !user;
        }
      )
      .required(),
    contact: yup
      .string()
      .matches(/^\d{7,15}$/, 'contact must be a valid phone number')
      .test(
        'contact-is-unique',
        '${value} has already been registered',
        async (value) => {
          const user = await userModel.findOne('contact', value);
          return !user;
        }
      )
      .required(),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
        'password must contain at least 1 uppercase, lowercase, number and special character (!@#$%^&*)'
      )
      .required(),
    role: yup.string().oneOf(['Customer', 'Admin']).required(),
    profile_pic_url: yup.string().url().notRequired()
  });

  const update = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    contact: yup
      .string()
      .matches(/^\d{7,15}$/, 'contact must be a valid phone number')
      .required(),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
        'password must contain at least 1 uppercase, lowercase, number and special character (!@#$%^&*)'
      )
      .required(),
    role: yup.string().oneOf(['Customer', 'Admin']).required(),
    profile_pic_url: yup.string().url().required()
  });

  return {
    create,
    update
  };
};

module.exports = UserSchema;
