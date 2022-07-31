import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  FormErrorMessage
} from '@chakra-ui/react';
import { Country } from '@common/types';
import { useEffect } from 'react';
import * as yup from 'yup';

import { useFormContext } from 'react-hook-form';
import { isValidNumberForRegion } from 'libphonenumber-js';

export type ContactInputProps = FormControlProps & {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  mobileCode: string | undefined;
  errorRes?: string;
};

export function ContactInput({
  name,
  label,
  type,
  placeholder,
  mobileCode,
  errorRes,
  ...formControlProps
}: ContactInputProps) {
  const {
    register,
    formState: { errors, dirtyFields }
  } = useFormContext<Record<string, unknown>>();
  const error = errors[name];

  return (
    <FormControl
      {...formControlProps}
      isInvalid={!!error || (!!errorRes && !dirtyFields?.[name])}
    >
      {label && (
        <FormLabel color="whiteAlpha.600" mb={0} fontWeight="normal">
          {label}
        </FormLabel>
      )}
      <InputGroup>
        <InputLeftAddon maxW="100px" color="whiteAlpha.600">
          {mobileCode}
        </InputLeftAddon>
        <Input {...register(name)} type={type} placeholder={placeholder} />
      </InputGroup>
      {error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
      {!!errorRes && !dirtyFields?.[name] && (
        <FormErrorMessage>{errorRes}</FormErrorMessage>
      )}
    </FormControl>
  );
}

export const contactInputValidation = (country: Country | undefined) =>
  yup
    .string()
    .test(
      'isValidContact',
      `Contact must be valid in ${country?.name}`,
      (contact) => {
        if (contact && country) {
          return isValidNumberForRegion(contact, country.code);
        }
        return true;
      }
    )
    .transform((value) => {
      return `${country?.mobileCode} ${value.replace(' ', '')}`;
    });
