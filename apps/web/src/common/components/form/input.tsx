import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput
} from '@chakra-ui/react';
import { useEffect } from 'react';

import { useFormContext } from 'react-hook-form';

export type InputProps = FormControlProps & {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  errorRes?: string;
};

export function Input({
  name,
  label,
  type,
  placeholder,
  defaultValue,
  errorRes,
  ...formControlProps
}: InputProps) {
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
      <ChakraInput
        {...register(name)}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
      {error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
      {!!errorRes && !dirtyFields?.[name] && (
        <FormErrorMessage>{errorRes}</FormErrorMessage>
      )}
    </FormControl>
  );
}
