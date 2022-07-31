import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  FormErrorMessage
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { useAxiosInterceptor } from '@common/hooks';

export type ContactInputProps = FormControlProps & {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  mobileCode: string | undefined;
};

export function ContactInput({
  name,
  label,
  type,
  placeholder,
  mobileCode,
  ...formControlProps
}: ContactInputProps) {
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
      <InputGroup>
        <InputLeftAddon maxW="100px" color="whiteAlpha.600">
          {mobileCode}
        </InputLeftAddon>
        <Input {...register(name)} type={type} placeholder={placeholder} />
      </InputGroup>
      {error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
      {!isDirty && !!validationError && (
        <FormErrorMessage>{validationError}</FormErrorMessage>
      )}
    </FormControl>
  );
}
