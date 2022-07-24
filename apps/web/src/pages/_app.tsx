import 'dayjs/locale/en-sg';
import type { AppProps } from 'next/app';
import {
  ChakraProvider,
  Box,
  Skeleton,
  Center,
  Spinner,
  useColorModeValue,
  useColorMode,
  Heading,
  useToast,
  Text
} from '@chakra-ui/react';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import { AuthProvider, useAuth } from 'src/modules/auth/hooks';
import { LoadpageProvider, useLoadpage } from '@common/hooks';
import { Redirects, Navbar } from '@common/components';
import { chakraTheme } from '../common/config';
import 'src/common/styles/globals.css';
import { useEffect } from 'react';
import { sleep } from '@common/utils';
import { client } from '../common/config';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={chakraTheme}>
        <MantineProviderWrapper>
          <AuthProvider>
            <LoadpageProvider>
              <Redirects />
              <Loading />
              <Navbar />
              <Component {...pageProps} />
            </LoadpageProvider>
          </AuthProvider>
        </MantineProviderWrapper>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

function MantineProviderWrapper({ children }: { children: React.ReactNode }) {
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

function Loading() {
  const { user, logout } = useAuth();
  const { isLoading, setIsLoading, isTimeout, setIsTimeout } = useLoadpage();
  const router = useRouter();
  const toast = useToast();

  // Mock load
  useEffect(() => {
    // setIsLoading(true);
    // sleep(1000).then(() => setIsLoading(false));
  }, []);

  // check for axios ERR_NETWORK
  useEffect(() => {
    client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 0) {
          toast.closeAll();
          toast({
            title: 'Network Error',
            description:
              'The server is not responding, please try again later.',
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'top'
          });
          setIsTimeout(true);
        }
        return Promise.reject(error);
      }
    );
  });

  if (user === undefined || isLoading) {
    return (
      <Center
        w="100vw"
        minH="100vh"
        backgroundColor="brandPaleBlue.800"
        zIndex={10}
        position="fixed"
      >
        {isTimeout ? (
          <Box textAlign="center">
            <Heading size="4xl">500</Heading>
            <Heading mt={5}>
              The server is{' '}
              <Text as="span" color="red.400">
                not responding
              </Text>
              .
            </Heading>
            <Heading fontWeight="semibold">Please try again later.</Heading>
          </Box>
        ) : (
          <Spinner color="brandGold.200" size="xl" thickness="4px" />
        )}
      </Center>
    );
  }
  return <></>;
}

export default MyApp;
