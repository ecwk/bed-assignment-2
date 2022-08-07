import type { NextPage } from 'next';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Highlight,
  HStack,
  Img,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

import {
  Main,
  Title,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Hide,
  ButtonLink
} from '@common/components';

const Home: NextPage = () => {
  const color = useColorModeValue('brandGray.900', 'brandGray.100');

  return (
    <Main maxW="1700px" w="100%" mx="auto" mt="80px">
      <Flex
        as="header"
        flex={0}
        flexGrow={5}
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex flexDir="column" pl={10}>
          <H1 size="4xl" lineHeight="taller">
            South East Asia's
            <br />
            <Highlight
              query="ranked"
              styles={{ px: '2', py: '1', rounded: 'sm', bg: 'brandGold.400' }}
              key="foo"
            >
              Top Ranked
            </Highlight>{' '}
            Airline.
          </H1>
          <Text
            mt={5}
            maxW="60ch"
            color="label-color"
            lineHeight="tall"
            fontSize="lg"
          >
            Singapore Airlines is the top ranked airline in the world. It
            guarantees the best price for your flight, whilst offering the best
            service and quality
          </Text>
          <VStack alignItems="flex-start" mt={8} spacing={5} maxW="60ch">
            <HStack>
              <Center p={1} backgroundColor="brandGold.500" borderRadius="full">
                <CheckIcon color="black" fontSize="xs" />
              </Center>
              <Text color={color}>
                <b>Top ranked</b> - Singapore Airlines is ranked the top airline
                in South East Asia by the International Federation of Airliners
                (IFAA).
              </Text>
            </HStack>
            <HStack>
              <Center p={1} backgroundColor="brandGold.500" borderRadius="full">
                <CheckIcon color="black" fontSize="xs" />
              </Center>
              <Text color={color}>
                <b>Customer first</b> - It is our mission to provide the best
                service possible by placing the highest value on our customers.
              </Text>
            </HStack>
          </VStack>
          <HStack mt={10} spacing={5}>
            <ButtonLink
              href="/search?type=flight"
              size="lg"
              colorScheme="brandGold"
            >
              Book A Flight
            </ButtonLink>
            <ButtonLink
              href="/signup"
              size="lg"
              variant="outline"
            >
              Create An Account
            </ButtonLink>
          </HStack>
        </Flex>
        <Hide below="xl">
          <Img
            src="/images/aircraft.svg"
            maxW={{ base: '700px', '2xl': '800px' }}
            w="100%"
            h="auto"
            flex={0}
            flexGrow={1}
          />
        </Hide>
      </Flex>
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
