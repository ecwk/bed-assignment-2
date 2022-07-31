import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  FormErrorMessage,
  type InputProps
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { useFormContext } from 'react-hook-form';
import { useState } from 'react';

export type PasswordInputProps = FormControlProps & {
  name: string;
  label?: string;
  placeholder?: string;
  toggleShowPassword?: boolean;
};

export function PasswordInput({
  name,
  label = 'Password',
  placeholder = 'Password',
  toggleShowPassword = true,
  ...formControlProps
}: PasswordInputProps) {
  const [show, setShow] = useState(false);
  const {
    register,
    formState: { errors }
  } = useFormContext<Record<string, unknown>>();
  const error = errors[name];

  const toggleShow = () => setShow((prev) => !prev);

  return (
    <FormControl {...formControlProps} isInvalid={!!error}>
      <FormLabel color="whiteAlpha.600" mb={0} fontWeight="normal">
        {label}
      </FormLabel>
      <InputGroup>
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
    </FormControl>
  );
}
