import { Button, Text, useColorMode, type ButtonProps } from '@chakra-ui/react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

export const ToggleColorButton = ({
  children,
  ...buttonProps
}: ButtonProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      leftIcon={
        colorMode === 'dark' ? (
          <IoMdSunny size="18px" />
        ) : (
          <IoMdMoon size="18px" />
        )
      }
      onClick={toggleColorMode}
      {...buttonProps}
    >
      <Text mr="auto">
        {colorMode === 'dark' ? 'Toggle Light' : 'Toggle Dark'}
      </Text>
    </Button>
  );
};
