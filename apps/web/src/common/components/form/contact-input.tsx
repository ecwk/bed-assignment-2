import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  FormErrorMessage,
  useColorModeValue,
  FormLabelProps
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { WarningTwoIcon } from '@chakra-ui/icons';

import { useAxiosInterceptor } from '@common/hooks';

export type ContactInputProps = FormControlProps & {
  name: string;
  label?: string;
  labelProps?: FormLabelProps;
  type?: string;
  placeholder?: string;
  mobileCode: string | undefined;
};

export function ContactInput({
  name,
  label,
  labelProps,
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

  const labelColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <FormControl
      {...formControlProps}
      isInvalid={!!error || (!isDirty && !!validationError)}
    >
      {label && (
        <FormLabel color={labelColor} {...labelProps}>
          {label}
        </FormLabel>
      )}
      <InputGroup>
        <InputLeftAddon maxW="100px" color="whiteAlpha.600">
          {mobileCode}
        </InputLeftAddon>
        <Input {...register(name)} type={type} placeholder={placeholder} />
      </InputGroup>
      {error && (
        <FormErrorMessage>
          <WarningTwoIcon mr={2} />
          {error?.message}
        </FormErrorMessage>
      )}
      {!isDirty && !!validationError && (
        <FormErrorMessage>
          <WarningTwoIcon mr={2} />
          {validationError}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}
