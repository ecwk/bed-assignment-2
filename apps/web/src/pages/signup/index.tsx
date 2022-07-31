import { NextPage } from 'next';
import { Flex, Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';

import { SignupForm } from '@modules/auth';
import { BackgroundVideo } from '@common/components';

const Signup: NextPage = () => {
  return (
    <Flex
      as="main"
      sx={{
        flexDir: 'column',
        mt: {
          base: '80px',
          md: '170px'
        },
        ml: {
          base: '0',
          lg: '200px'
        },
        mb: {
          base: '80px',
          md: '40px'
        },
        px: {
          base: 5,
          xl: 10
        },
        alignItems: {
          base: 'center',
          lg: 'flex-start'
        }
      }}
    >
      <Box as="header">
        <Heading as="h2" size="md" color="brand">
          SIGN UP
        </Heading>
        <Heading as="h1" my={4} size="3xl">
          Create Your Account
          <Text as="span" color="brandGold.300">
            .
          </Text>
        </Heading>
      </Box>

      <SignupForm
        sx={{
          mt: 6,
          maxW: {
            base: '400px',
            md: '500px'
          }
        }}
      />

      <BackgroundVideo />
    </Flex>
  );
};

export default Signup;
