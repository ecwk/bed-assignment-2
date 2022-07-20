import type { NextPage } from 'next';

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

const Home: NextPage = () => {
  return (
    <Flex flexDir="column" alignItems="center">
      <Flex
        position="relative"
        alignItems="center"
        height="calc(100vh + 100px)"
        minWidth="100vh"
        width="100%"
        flexDir="column"
        _after={{
          content: '""',
          position: 'fixed',
          background: 'linear-gradient(60deg, #FF00A8, #402FE0, #000000)',
          opacity: 0.35,
          top: 0,
          left: 0,
          zIndex: -1,
          width: '100%',
          height: '100%'
        }}
      >
        <Heading fontSize="100px">
          Fly Safe
          <Text as="span" color="#CEB85F">
            Fly SP
          </Text>
        </Heading>
        <Box>
          <Button colorScheme="blue" size="lg">
            Check In
          </Button>
          <Button colorScheme="blue" size="lg" variant="outline">
            Learn More
          </Button>
        </Box>
      </Flex>
      <Flex width="100%" height="2000px" background="white"></Flex>
    </Flex>
  );
};

export default Home;
