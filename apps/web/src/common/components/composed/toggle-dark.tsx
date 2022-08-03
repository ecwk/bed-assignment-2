import {
  IconButton,
  useColorMode,
  type IconButtonProps
} from '@chakra-ui/react';
import { IoMdSunny, IoMdMoon } from 'react-icons/io';

export type ToggleDarkProps = Omit<IconButtonProps, 'aria-label'> & {};

export const ToggleDark = ({ ...iconButtonProps }: ToggleDarkProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      variant="outline"
      icon={colorMode === 'light' ? <IoMdMoon /> : <IoMdSunny />}
      onClick={toggleColorMode}
      aria-label="Toggle Dark Mode"
      {...iconButtonProps}
    />
  );
};

<ToggleDark />;
