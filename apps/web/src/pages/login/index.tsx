import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Input,
  VStack,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';

import { useAuth, LoginForm } from '@modules/auth';
import { NAVBAR_HEIGHT } from '@common/constants';
import { useLoadpage } from '@common/hooks';
import { BackgroundVideo } from '@common/components';

const Login: NextPage = () => {
  const textAccent = useColorModeValue('blue.200', 'brandGold.300');

  return (
    <Flex
      minH={`calc(100vh - ${NAVBAR_HEIGHT})`}
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
        alignItems={{
          base: 'center',
          lg: 'flex-start'
        }}
        mt={{
          base: '80px',
          md: '200px'
        }}
        ml={{
          base: '0',
          lg: '200px'
        }}
        mb={{
          base: '80px',
          md: '40px'
        }}
        width="100%"
      >
        <Box>
          <Heading size="md">LOGIN</Heading>
          <Heading my={4} size="3xl">
            Welcome back
            <Text as="span" color={textAccent}>
              .
            </Text>
          </Heading>
        </Box>
        <Box maxW="400px" w="100%">
          <LoginForm mt={6} />
          <Text mt={6} textAlign="center">
            Don't have an account yet?{' '}
            <NextLink href="/signup" passHref>
              <Link color={textAccent}>Sign Up</Link>
            </NextLink>
            .
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
