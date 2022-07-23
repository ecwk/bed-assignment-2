import { SelectItem } from '@mantine/core';

export type FlightOption = SelectItem & {
  label: string;
  country: string;
  city: string;
  name: string;
  description: string;
};
