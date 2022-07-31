import { useColorMode } from '@chakra-ui/react';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';

export function MantineProviderWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <ColorSchemeProvider
      colorScheme={colorMode}
      toggleColorScheme={toggleColorMode}
    >
      <MantineProvider theme={{ colorScheme: colorMode }}>
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
