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
import { Main, BackgroundVideo } from '@common/components';

const Login: NextPage = () => {
  return (
    <Main
      display="flex"
      flexDir="column"
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
      alignItems={{
        base: 'center',
        lg: 'flex-start'
      }}
    >
      <Box as="header">
        <Heading as="h2" size="md" color="brand">
          LOGIN
        </Heading>
        <Heading as="h1" my={4} size="3xl">
          Welcome back
          <Text as="span" color="brandGold.300">
            .
          </Text>
        </Heading>
      </Box>

      <LoginForm
        sx={{
          mt: 6,
          w: '100%',
          maxW: '400px'
        }}
      />

      <BackgroundVideo />
    </Main>
  );
};

export default Login;
