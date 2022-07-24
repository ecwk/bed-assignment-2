import {
  Box,
  Flex,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Button
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { FaArrowRight } from 'react-icons/fa';

import { server } from '@config/axios';
import { type Flight } from '@common/types';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

type FlightsSearchProps = ServerSideProps & {};

const SearchFlightsResult: NextPage<FlightsSearchProps> = ({ flights }) => {
  const router = useRouter();
  const { query } = router;

  if (!flights) {
    return <></>;
  }

  const flight = flights[0];
  const {
    originAirportName,
    originAirportCity,
    originAirportCountry,
    destinationAirportName,
    destinationAirportCity,
    destinationAirportCountry,
    departureDate,
    returnDate,
    embarkDate
  } = flight;
  const isTwoWay = query.isTwoWay === 'true';

  return (
    <Flex
      flexDir="column"
      maxW="1000px"
      mx="auto"
      my="80px"
      background="brandPaleBlue.700"
      borderRadius="xl"
    >
      <Box px={10} mt={10}>
        {/* 
                from
                to
                departure date
                return date
                onewayflight
                directflight
              */}
        <Heading>Search Results</Heading>
        <Stat mt={5}>
          <StatLabel>
            From: {originAirportName}, {originAirportCountry},{' '}
            {originAirportCity}
          </StatLabel>
          <StatLabel>
            To: {destinationAirportName}, {destinationAirportCountry},{' '}
            {destinationAirportCity}
          </StatLabel>
          <StatHelpText mt={2} mb={0}>
            Departure Date:{' '}
            {new Date(departureDate).toLocaleDateString('en-SG', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}{', '}
            {new Date(departureDate).toLocaleTimeString('en-SG')}
          </StatHelpText>
          {isTwoWay && (
            <StatHelpText>
              Return Date:{' '}
              {new Date(returnDate).toLocaleDateString('en-SG', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}{', '}
              {new Date(returnDate).toLocaleTimeString('en-SG')}
            </StatHelpText>
          )}
        </Stat>
      </Box>
      {flights.map(
        (
          {
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
            destinationAirportCountry,
            departureDate,
            returnDate
          },
          i
        ) => (
          <Flex
            key={flightId}
            borderTop="1px solid"
            borderColor="gray.600"
            p={10}
            mt={i === 0 ? 5 : 0}
            alignItems="center"
            justifyContent="space-around"
          >
            <Stat>
              <StatLabel>{flightCode}</StatLabel>
              <StatNumber color="green.300">${price}</StatNumber>
            </Stat>
            <Box>
              <Button>Book This Flight</Button>
            </Box>
            {/* <Box my={10}>
              <Heading size="sm" color="gray.300">
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
              <Heading size="sm" color="gray.300">
                {destinationAirportCountry}, {destinationAirportCity}
              </Heading>
              <Heading size="lg">{destinationAirportName}</Heading>
              <Text fontSize="sm">
                {flightCode} ({aircraftName})
              </Text>
              <Text>${price}</Text>
            </Box> */}
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
  isTwoWay: string;
  isDirect: string;
};

export const getServerSideProps: GetServerSideProps<
  ServerSideProps,
  ServerSideQueries
> = async (ctx) => {
  const { from, to, departureDate, returnDate, isTwoWay, isDirect } = ctx.query;
  let flights: Flight[] | null;
  try {
    const res = await server.get(
      `/flights/direct/${from}/${to}?departureDate=${departureDate}&returnDate=${returnDate}&isTwoWay=${isTwoWay}&isDirect=${isDirect}`
    );
    flights = res.data?.flights ?? null;
  } catch (err) {
    if (!(err instanceof AxiosError)) {
      console.error(err);
    }
    flights = null;
  }
  return {
    props: {
      flights
    }
  };
};

export default SearchFlightsResult;
