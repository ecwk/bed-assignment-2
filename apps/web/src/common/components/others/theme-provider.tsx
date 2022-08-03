import { useColorMode } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';

import { theme } from '@common/config';

export type ThemeProviderProps = {
  children?: React.ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <ChakraProvider theme={theme}>
      <ColorSchemeProvider
        colorScheme={colorMode}
        toggleColorScheme={toggleColorMode}
      >
        <MantineProvider theme={{ colorScheme: colorMode }}>
          {children}
        </MantineProvider>
      </ColorSchemeProvider>
    </ChakraProvider>
  );
}
