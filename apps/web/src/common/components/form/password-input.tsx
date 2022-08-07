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
  type InputGroupProps,
  useColorModeValue,
  FormLabelProps
} from '@chakra-ui/react';
import {
  ViewIcon,
  ViewOffIcon,
  LockIcon,
  WarningTwoIcon
} from '@chakra-ui/icons';

import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { useAxiosInterceptor } from '@common/hooks';

export type PasswordInputProps = FormControlProps & {
  name: string;
  label?: string;
  labelProps?: FormLabelProps;
  placeholder?: string;
  toggleShowPassword?: boolean;
  inputProps?: InputGroupProps;
  iconColor?: string;
};

export function PasswordInput({
  name,
  label,
  labelProps,
  placeholder,
  toggleShowPassword = true,
  inputProps,
  iconColor,
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

  const labelColor = useColorModeValue('gray.700', 'gray.300');

  const toggleShow = () => setShow((prev) => !prev);

  return (
    <FormControl
      {...formControlProps}
      isInvalid={!!error || (!isDirty && errorRes?.statusCode === 401)}
    >
      <FormLabel color={labelColor} {...labelProps}>
        {label}
      </FormLabel>
      <InputGroup {...inputProps}>
        <InputLeftElement>
          <LockIcon color={iconColor} />
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
              icon={
                show ? (
                  <ViewOffIcon  />
                ) : (
                  <ViewIcon />
                )
              }
              onClick={toggleShow}
              aria-label="Toggle password visibility"
            />
          </InputRightElement>
        )}
      </InputGroup>
      {error && (
        <FormErrorMessage>
          <WarningTwoIcon mr={2} />
          {error?.message}
        </FormErrorMessage>
      )}
      {!isDirty && errorRes?.statusCode === 401 && (
        <FormErrorMessage>
          <WarningTwoIcon mr={2} />
          {errorRes?.error}
        </FormErrorMessage>
      )}
    </FormControl>
  );
}
