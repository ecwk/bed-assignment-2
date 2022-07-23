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

const Login: NextPage = () => {
  const { user, login, logout } = useAuth();
  const { setIsLoading } = useLoadpage();
  const { colorMode } = useColorMode();

  const textAccent = useColorModeValue('blue.200', 'brandGold.300');

  const onLoadStartVideo = () => {
    setIsLoading(true);
  };

  const onLoadedDataVideo = () => {
    setIsLoading(false);
  };

  return (
    <Flex minH={`calc(100vh - ${NAVBAR_HEIGHT})`}>
      <Box
        position="fixed"
        top="0"
        left="0"
        zIndex="-1"
        width="100%"
        height="100%"
        background={
          colorMode === 'dark'
            ? 'linear-gradient(140deg, rgba(28,28,28,1) 0%, rgba(28,28,28,0.6) 60%, #1328417f 100% )'
            : 'linear-gradient(0deg,  #1c1c1c4b 0%, #0f0f0fb7 20%, #33656e2b 80%, #c1f8fc60 100% )'
        }
      />
      {colorMode === 'dark' ? (
        <Box
          id="background-dark"
          key="background-dark"
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
          onLoadStart={onLoadStartVideo}
          onLoadedData={onLoadedDataVideo}
        >
          <source
            src="https://cdn.cnoside.dev/bed-assignment-2.deploy.cnoside.dev/background-dark.mp4"
            type="video/mp4"
          />
        </Box>
      ) : (
        <Box
          id="background-light"
          key="background-light"
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
          onLoadStart={onLoadStartVideo}
          onLoadedData={onLoadedDataVideo}
        >
          <source
            src="https://cdn.cnoside.dev/bed-assignment-2.deploy.cnoside.dev/background-light.mp4"
            type="video/mp4"
          />
        </Box>
      )}
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
