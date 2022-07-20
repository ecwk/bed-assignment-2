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

import { useAuth } from 'src/modules/auth';

const Login: NextPage = () => {
  const { user, login, logout } = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Flex>
      <Flex color="brandText" flexDir="column" mt="250px" ml="100px">
        <Heading size="md" color="brand">
          LOGIN
        </Heading>
        <Heading my={4} size="3xl">
          Welcome back
          <Text as="span" color="brand.300">
            .
          </Text>
        </Heading>
        <Text>
          Don't have an account yet?{' '}
          <NextLink href="/signup" passHref>
            <Link color="blue.300">Sign Up</Link>
          </NextLink>
        </Text>
        <Flex as="form" mt={6} flexDir="column" gap={5}>
          <Input type="email" placeholder="Email" size="lg" />
          <Input type="password" placeholder="Password" size="lg" />
          <Button
            onClick={() => {
              login('customer1@mail.com', '1q!Q1q!Q');
            }}
            // type="submit"
            colorScheme="brand"
            size="lg"
          >
            Login
          </Button>
          <Button
            onClick={() => {
              logout();
            }}
            // type="submit"
            colorScheme="brand"
            size="lg"
          >
            Logout
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
