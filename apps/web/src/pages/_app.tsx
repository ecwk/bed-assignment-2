import 'dayjs/locale/en-sg';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import {
  Redirects,
  Navbar,
  MantineProviderWrapper,
  Loadpage,
  AnimationWrapper
} from '@common/components';
import 'src/common/styles/globals.css';
import { chakraTheme } from '@common/config';
import { AuthProvider } from '@modules/auth';
import { CartProvider, LoadpageProvider } from '@common/hooks';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={chakraTheme}>
        <MantineProviderWrapper>
          <AuthProvider>
            <LoadpageProvider>
              <Loadpage>
                <CartProvider>
                  <Redirects />
                  <Navbar />
                  <AnimationWrapper>
                    <Component {...pageProps} />
                  </AnimationWrapper>
                </CartProvider>
              </Loadpage>
            </LoadpageProvider>
          </AuthProvider>
        </MantineProviderWrapper>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
