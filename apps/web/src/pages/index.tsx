import type { NextPage } from 'next';
import { Box, Button, Center, Flex, Heading, Text } from '@chakra-ui/react';

import { Main, Title, H1, H2, H3, H4, H5, H6 } from '@common/components';

const Home: NextPage = () => {
  return (
    <Main>
      <Title title="Homepage" subtitle="Welcome home, fellow human." />
      <H1>Heading 1</H1>
      <H2>Heading 2</H2>
      <H3>Heading 3</H3>
      <H4>Heading 4</H4>
      <H5>Heading 5</H5>
      <H6>Heading 6</H6>
    </Main>
  );

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
