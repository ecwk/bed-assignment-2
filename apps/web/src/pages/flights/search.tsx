import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { FaSearch, FaArrowRight } from 'react-icons/fa';

import { type Flight } from '@common/types';
import { server } from '@config/axios';
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';

type FlightsSearchProps = ServerSideProps & {};

const FlightsSearch: NextPage<FlightsSearchProps> = ({ flights }) => {
  if (!flights) {
    return <></>;
  }

  return (
    <Flex
      flexDir="column"
      maxW="1000px"
      mx="auto"
      my="80px"
      background="brandPaleBlue.700"
      borderRadius="xl"
    >
      <Heading px={10} mt={10}>
        Search Results
      </Heading>
      {flights.map(
        ({
          flightId,
          flightCode,
          aircraftName,
          embarkDate,
          travelTime,
          price,
          originAirportCity,
          destinationAirportCity,
          originAirportName,
          destinationAirportName,
          originAirportCountry,
          destinationAirportCountry
        }) => (
          <Flex
            key={flightId}
            borderTop="1px solid"
            borderColor="gray.600"
            px={10}
            mt={10}
            alignItems="center"
            justifyContent="space-around"
          >
            <Box>
              <Heading size="sm" color="gray.300" mt={10}>
                {originAirportCountry}, {originAirportCity}
              </Heading>
              <Heading size="lg">{originAirportName}</Heading>
              <Text fontSize="sm">
                {flightCode} ({aircraftName})
              </Text>
              <Text>${price}</Text>
            </Box>
            <FaArrowRight size="30px" style={{ marginTop: '30px' }} />
            <Box>
              <Heading size="sm" color="gray.300" mt={10}>
                {destinationAirportCountry}, {destinationAirportCity}
              </Heading>
              <Heading size="lg">{destinationAirportName}</Heading>
              <Text fontSize="sm">
                {flightCode} ({aircraftName})
              </Text>
              <Text>${price}</Text>
            </Box>
          </Flex>
        )
      )}
    </Flex>
  );
};

type ServerSideProps = {
  flights: Flight[] | null;
};

type ServerSideQueries = {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  isDirect: string;
};

export const getServerSideProps: GetServerSideProps<
  ServerSideProps,
  ServerSideQueries
> = async (ctx) => {
  const token = ctx.req.cookies.token;
  const { from, to, departureDate, returnDate, isDirect } = ctx.query;

  let flights: Flight[] | null;
  if (!token) {
    flights = null;
  } else {
    try {
      server.defaults.headers.common.Authorization = `Bearer ${token}`;
      const res = await server.get(
        `/flights/direct/${from}/${to}?departureDate=${departureDate}&returnDate=${returnDate}&isDirect=${isDirect}`
      );
      flights = res.data?.flights ?? null;
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        console.error(err);
      }
      flights = null;
    }
  }
  return {
    props: {
      flights
    }
  };
};

export default FlightsSearch;
