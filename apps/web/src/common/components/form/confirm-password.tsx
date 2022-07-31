import { Flex, FlexProps } from '@chakra-ui/react';

import { PasswordInput } from './password-input';

export type ConfirmPasswordProps = FlexProps & {
  password: {
    name: string;
    label?: string;
    placeholder?: string;
  };
  confirmPassword: {
    name: string;
    label?: string;
    placeholder?: string;
  };
};

export function ConfirmPassword({
  password,
  confirmPassword,
  ...flexProps
}: ConfirmPasswordProps) {
  return (
    <Flex
      sx={{
        gap: 4,
        '& > *': {
          flexBasis: 0,
          flexGrow: 1,
          _focusWithin: {
            flexGrow: 2
          },
          transition: '0.2s'
        }
      }}
      {...flexProps}
    >
      <PasswordInput
        name={password.name}
        label={password.label}
        placeholder={password.placeholder}
        toggleShowPassword={false}
      />
      <PasswordInput
        name={confirmPassword.name}
        label={confirmPassword.label}
        placeholder={confirmPassword.placeholder}
        toggleShowPassword={false}
      />
    </Flex>
  );
}
