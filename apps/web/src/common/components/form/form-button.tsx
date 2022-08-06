import { CheckIcon } from '@chakra-ui/icons';
import { Button, type ButtonProps } from '@chakra-ui/react';

export type FormButtonProps = ButtonProps & {
  isLoading?: boolean;
  isSuccess?: boolean;
  children?: React.ReactNode;
};

export function FormButton({
  size = 'md',
  children,
  isLoading,
  isSuccess,
  ...buttonProps
}: FormButtonProps) {
  return (
    <Button
      type="submit"
      colorScheme="brandGold"
      size={size}
      isLoading={isLoading}
      {...(isSuccess && {
        colorScheme: 'green'
      })}
      {...buttonProps}
    >
      {isSuccess ? <CheckIcon /> : children}
    </Button>
  );
}
