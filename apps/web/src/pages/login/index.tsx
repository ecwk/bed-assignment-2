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
  VStack
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Link } from '@chakra-ui/react';

import { useAuth, LoginForm } from '@modules/auth';
import { NAVBAR_HEIGHT } from '@common/constants';

const Login: NextPage = () => {
  const { user, login, logout } = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Flex minH={`calc(100vh - ${NAVBAR_HEIGHT})`}>
      <Box
        position="fixed"
        top="0"
        left="0"
        zIndex="-1"
        width="100%"
        height="100%"
        background="linear-gradient(140deg, rgba(28,28,28,1) 0%, rgba(28,28,28,0.6) 60%, #1328417f 100% )"
      />
      <Box
        as="video"
        top="0"
        left="0"
        autoPlay
        loop
        muted
        position="fixed"
        zIndex="-2"
        minW="100%"
        minH="100%"
        objectFit="cover"
      >
        <source src="/background-spair.mp4" type="video/mp4" />
      </Box>
      <Flex color="brandText" flexDir="column" mt="200px" ml="200px">
        <Heading size="md" color="brand">
          LOGIN
        </Heading>
        <Heading my={4} size="3xl">
          Welcome back
          <Text as="span" color="brand.300">
            .
          </Text>
        </Heading>
        <LoginForm mt={6} />
        <Text mt={6} textAlign="center">
          Don't have an account yet?{' '}
          <NextLink href="/signup" passHref>
            <Link color="red.300">Sign Up</Link>
          </NextLink>
          .
        </Text>
      </Flex>
    </Flex>
  );
};

export default Login;
