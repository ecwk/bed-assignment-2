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
    <Flex minH={`calc(100vh - ${NAVBAR_HEIGHT})`}>
      <BackgroundVideo />
      <Flex
        color="brandText"
        flexDir="column"
        mt="200px"
        ml="200px"
        width="100%"
      >
        <Heading size="md">LOGIN</Heading>
        <Heading my={4} size="3xl">
          Welcome back
          <Text as="span" color={textAccent}>
            .
          </Text>
        </Heading>
        <Box maxW="400px">
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
