import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { theme } from '@config/theme';
import { AuthProvider } from '@modules/auth';
import { CartProvider, LoadpageProvider } from '@common/hooks';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';

const queryClient = new QueryClient();

export type ProvidersProps = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Mantine>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <LoadpageProvider>
              <CartProvider>
                  {children}
              </CartProvider>
            </LoadpageProvider>
          </AuthProvider>
        </QueryClientProvider>
      </Mantine>
    </ChakraProvider>
  );
};

const Mantine = ({ children }: ProvidersProps) => {
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
};
