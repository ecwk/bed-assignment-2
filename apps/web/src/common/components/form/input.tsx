import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { useAxiosInterceptor } from '@common/hooks';

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
  const { validationErrors } = useAxiosInterceptor();
  const {
    register,
    formState: { errors, dirtyFields }
  } = useFormContext<Record<string, unknown>>();
  const error = errors[name];
  const validationError = validationErrors?.[name];
  const isDirty = dirtyFields?.[name];

  return (
    <FormControl
      {...formControlProps}
      isInvalid={!!error || (!isDirty && !!validationError)}
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
      {!isDirty && !!validationError && (
        <FormErrorMessage>{validationError}</FormErrorMessage>
      )}
    </FormControl>
  );
}
