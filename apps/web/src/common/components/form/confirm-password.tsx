import { Flex, FlexProps, FormLabelProps } from '@chakra-ui/react';

import { PasswordInput } from './password-input';

export type ConfirmPasswordProps = FlexProps & {
  password: {
    name: string;
    label?: string;
    labelProps?: FormLabelProps;
    placeholder?: string;
  };
  confirmPassword: {
    name: string;
    label?: string;
    labelProps?: FormLabelProps;
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
        labelProps={password.labelProps}
        placeholder={password.placeholder}
        toggleShowPassword={false}
      />
      <PasswordInput
        name={confirmPassword.name}
        label={confirmPassword.label}
        labelProps={confirmPassword.labelProps}
        placeholder={confirmPassword.placeholder}
        toggleShowPassword={false}
      />
    </Flex>
  );
}
