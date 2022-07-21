import { Flex, Box, Heading, Text, Link, useColorMode } from '@chakra-ui/react';
import NextLink from 'next/link';
import { NextPage } from 'next';

import { useAuth, SignupForm } from '@modules/auth';
import { NAVBAR_HEIGHT } from '@common/constants';

const Signup: NextPage = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex>
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
        >
          <source
            src="https://cdn.cnoside.dev/bed-assignment-2.deploy.cnoside.dev/background-light.mp4"
            type="video/mp4"
          />
        </Box>
      )}
      <Flex color="brandText" flexDir="column" mt="170px" ml="200px" mb="40px">
        <Heading size="md" color="brand">
          SIGN UP
        </Heading>
        <Heading my={4} size="3xl">
          Create Your Account
          <Text as="span" color="brand.300">
            .
          </Text>
        </Heading>
        <Box maxW="500px">
          <SignupForm mt={6} />
          <Text mt={6} textAlign="center">
            Already created an account?{' '}
            <NextLink href="/login" passHref>
              <Link color="red.300">Login</Link>
            </NextLink>
            .
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Signup;
