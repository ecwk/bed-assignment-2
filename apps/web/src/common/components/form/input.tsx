import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  type FormControlProps,
  type InputGroupProps
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { useAxiosInterceptor } from '@common/hooks';

export type InputProps = FormControlProps & {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  inputProps?: InputGroupProps;
  leftElement?: React.ReactNode;
};

export function Input({
  name,
  label,
  type,
  placeholder,
  defaultValue,
  inputProps,
  leftElement,
  ...formControlProps
}: InputProps) {
  const { error: errorRes, validationErrors } = useAxiosInterceptor();
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
      isInvalid={
        !!error ||
        (!isDirty && !!validationError) ||
        (!isDirty && errorRes?.statusCode === 401)
      }
    >
      {label && (
        <FormLabel color="whiteAlpha.600" mb={0} fontWeight="normal">
          {label}
        </FormLabel>
      )}
      <InputGroup {...inputProps}>
        {leftElement && <InputLeftElement>{leftElement}</InputLeftElement>}
        <ChakraInput
          {...register(name)}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
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
