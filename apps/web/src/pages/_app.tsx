import 'dayjs/locale/en-sg';
import type { AppProps } from 'next/app';
import {
  ChakraProvider,
  Box,
  Skeleton,
  Center,
  Spinner,
  useColorModeValue
} from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import { AuthProvider, useAuth } from 'src/modules/auth/hooks';
import { LoadpageProvider, useLoadpage } from '@common/hooks';
import { Redirects, Navbar } from '@common/components';
import { theme } from '../common/config';
import 'src/common/styles/globals.css';
import { useEffect } from 'react';
import { sleep } from '@common/utils';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <LoadpageProvider>
            <Redirects />
            <Loading />
            <Navbar />
            <Component {...pageProps} />
          </LoadpageProvider>
        </AuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

function Loading() {
  const { user } = useAuth();
  const { isLoading, setIsLoading } = useLoadpage();

  // Mock load
  useEffect(() => {
    setIsLoading(true);
    sleep(1000).then(() => setIsLoading(false));
  }, []);

  if (user === undefined || isLoading) {
    return (
      <Center
        w="100vw"
        minH="100vh"
        backgroundColor="brandPaleBlue.800"
        zIndex={10}
        position="fixed"
      >
        <Spinner color="brandGold.200" size="xl" thickness="4px" />
      </Center>
    );
  }
  return <></>;
}

export default MyApp;
