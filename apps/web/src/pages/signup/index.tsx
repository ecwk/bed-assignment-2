import {
  Flex,
  Box,
  Heading,
  Text,
  Link,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { NextPage } from 'next';

import { useAuth, SignupForm } from '@modules/auth';
import { NAVBAR_HEIGHT } from '@common/constants';
import { useLoadpage } from '@common/hooks';
import { BackgroundVideo } from '@common/components';

const Signup: NextPage = () => {
  const { colorMode } = useColorMode();
  const { setIsLoading } = useLoadpage();

  const textAccent = useColorModeValue('blue.200', 'brandGold.300');

  const onLoadStartVideo = () => {
    setIsLoading(true);
  };

  const onLoadedDataVideo = () => {
    setIsLoading(false);
  };

  return (
    <Flex>
      <BackgroundVideo />
      <Flex color="brandText" flexDir="column" mt="170px" ml="200px" mb="40px">
        <Heading size="md" color="brand">
          SIGN UP
        </Heading>
        <Heading my={4} size="3xl">
          Create Your Account
          <Text as="span" color={textAccent}>
            .
          </Text>
        </Heading>
        <Box maxW="500px">
          <SignupForm mt={6} />
          <Text mt={6} textAlign="center">
            Already created an account?{' '}
            <NextLink href="/login" passHref>
              <Link color={textAccent}>Login</Link>
            </NextLink>
            .
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Signup;
