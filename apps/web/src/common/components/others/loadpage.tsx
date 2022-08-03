import {
  Box,
  Center,
  Spinner,
  Heading,
  useToast,
  Text
} from '@chakra-ui/react';
import 'dayjs/locale/en-sg';
import { useEffect } from 'react';

import { client } from '@common/config';
import { useAuth } from '@modules/auth';
import { useLoadpage } from '@common/hooks';

export type LoadpageProps = {
  children: React.ReactNode;
};

export function Loadpage({ children }: LoadpageProps) {
  const { user } = useAuth();
  const { isLoading, isTimeout, setIsTimeout } = useLoadpage();
  const toast = useToast();

  useEffect(() => {
    const id = client.interceptors.response.use(
      (response) => {
        console;
        return response;
      },
      (error) => {
        if (error?.response?.status === 0) {
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
    return () => {
      client.interceptors.response.eject(id);
    };
  }, []);

  if (user === undefined || isLoading || isTimeout) {
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
  return <>{children}</>;
}
