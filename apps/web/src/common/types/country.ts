import { CountryCode } from 'libphonenumber-js';

export type Code = CountryCode;

export type Country = {
  name: string;
  code: Code;
  timezone: string;
  utc: string;
  mobileCode: string;
};
