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
  const textAccent = useColorModeValue('blue.200', 'brandGold.300');


  return (
    <Flex
      px={{
        base: 2,
        sm: 5,
        xl: 10
      }}
    >
      <BackgroundVideo />
      <Flex
        color="brandText"
        flexDir="column"
        w="100%"
        alignItems={{
          base: 'center',
          lg: 'flex-start'
        }}
        mt={{
          base: '80px',
          md: '170px'
        }}
        ml={{
          base: '0',
          lg: '200px'
        }}
        mb={{
          base: '80px',
          md: '40px'
        }}
      >
        <Box>
          <Heading size="md" color="brand">
            SIGN UP
          </Heading>
          <Heading my={4} size="3xl">
            Create Your Account
            <Text as="span" color={textAccent}>
              .
            </Text>
          </Heading>
        </Box>
        <Box
          maxW={{
            base: '400px',
            md: '500px'
          }}
        >
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
