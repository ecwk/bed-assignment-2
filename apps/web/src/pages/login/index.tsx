import { NextPage } from 'next';
import { Box, Heading, Text } from '@chakra-ui/react';

import { LoginForm } from '@modules/auth';
import { Main, BackgroundVideo } from '@common/components';

const Login: NextPage = () => {
  return (
    <>
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
      </Main>
      <BackgroundVideo />
    </>
  );
};

export default Login;
