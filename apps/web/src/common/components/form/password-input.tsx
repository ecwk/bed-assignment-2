import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  FormErrorMessage,
  type InputGroupProps
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, LockIcon } from '@chakra-ui/icons';

import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { useAxiosInterceptor } from '@common/hooks';

export type PasswordInputProps = FormControlProps & {
  name: string;
  label?: string;
  placeholder?: string;
  toggleShowPassword?: boolean;
  inputProps?: InputGroupProps;
};

export function PasswordInput({
  name,
  label,
  placeholder,
  toggleShowPassword = true,
  inputProps,
  ...formControlProps
}: PasswordInputProps) {
  const { error: errorRes } = useAxiosInterceptor();
  const [show, setShow] = useState(false);
  const {
    register,
    formState: { errors, dirtyFields }
  } = useFormContext<Record<string, unknown>>();
  const error = errors[name];
  const isDirty = dirtyFields?.[name];

  const toggleShow = () => setShow((prev) => !prev);

  return (
    <FormControl
      {...formControlProps}
      isInvalid={!!error || (!isDirty && errorRes?.statusCode === 401)}
    >
      <FormLabel color="whiteAlpha.600" mb={0} fontWeight="normal">
        {label}
      </FormLabel>
      <InputGroup {...inputProps}>
        <InputLeftElement>
          <LockIcon />
        </InputLeftElement>
        <Input
          {...register(name)}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          pr="60px"
        />
        {toggleShowPassword && (
          <InputRightElement>
            <IconButton
              size="sm"
              icon={show ? <ViewOffIcon /> : <ViewIcon />}
              onClick={toggleShow}
              aria-label="Toggle password visibility"
            />
          </InputRightElement>
        )}
      </InputGroup>
      {error && <FormErrorMessage>{error?.message}</FormErrorMessage>}
      {!isDirty && errorRes?.statusCode === 401 && (
        <FormErrorMessage>{errorRes?.error}</FormErrorMessage>
      )}
    </FormControl>
  );
}
