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
  Button,
  Link
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { FaArrowRight } from 'react-icons/fa';
import NextLink from 'next/link';
import { BiLinkExternal } from 'react-icons/bi';
import { Indicator } from '@mantine/core';
import ms from 'ms';

import { server } from '@config/axios';
import { type Flight, type Airport } from '@common/types';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getMs } from '@common/utils';
import { AirportTitle, FlightItem } from '@modules/flights';

type FlightsSearchProps = ServerSideProps & {};

const SearchFlightsResult: NextPage<FlightsSearchProps> = ({
  oneWayFlights,
  twoWayFlights,
  originAirport,
  destinationAirport
}) => {
  const router = useRouter();
  const isTwoWay = router.query.isTwoWay === 'true';
  const isDirect = router.query.isDirect === 'true';
  const { departureDate, returnDate } = router.query;
  const departureDateString =
    typeof departureDate === 'string' ? departureDate : '';
  const returnDateString = typeof returnDate === 'string' ? returnDate : '';

  const returnDatez =
    typeof router.query.returnDate === 'string'
      ? dayjs(router.query.returnDate)
      : null;

  return (
    <Flex
      flexDir="column"
      maxW="1000px"
      mx="auto"
      my="80px"
      background="brandPaleBlue.700"
      borderRadius="xl"
    >
      <Box
        mt={10}
        sx={{
          '&>*': {
            px: 10
          }
        }}
      >
        <Heading>
          {isTwoWay ? 'Two-Way' : 'One-Way'}
          {isDirect ? ' Direct' : ' Layover'} Flights
        </Heading>
        <Flex justifyContent="space-around" my={16}>
          <AirportTitle
            type="departure"
            airport={originAirport}
            airportDepatureDate={departureDateString}
          />
          <FaArrowRight size="30px" style={{ alignSelf: 'center' }} />
          <AirportTitle
            type="return"
            airport={destinationAirport}
            airportDepatureDate={returnDateString}
          />
        </Flex>
        <Flex flexDir="column">
          {isTwoWay ? (
            // twoWayFlights.map((flight) => ())
            <></>
          ) : (
            oneWayFlights.map((flight, i) => (
              <FlightItem key={flight.flightId} flight={flight} />
            ))
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

type ServerSideProps = {
  oneWayFlights: Flight[];
  twoWayFlights: (Flight & {
    returnFlightId: number;
    returnFlightCode: string;
    returnAircraftName: string;
    returnTravelTime: string;
    returnPrice: number;
    returnDepartureDate: string;
    totalPrice: string;
  })[];
  originAirport: Airport;
  destinationAirport: Airport;
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
  const oneWayFlights = (
    await server.get(`/flights/direct/one-way/${from}/${to}`)
  ).data.flights;
  const twoWayFlights = (
    await server.get(`flights/direct/two-way/${from}/${to}`)
  ).data.flights;
  const originAirport = (await server.get(`/airports/${from}`)).data.airport;
  const destinationAirport = (await server.get(`/airports/${to}`)).data.airport;

  return {
    props: {
      oneWayFlights: oneWayFlights,
      twoWayFlights: twoWayFlights,
      originAirport: originAirport,
      destinationAirport: destinationAirport
    }
  };
};

export default SearchFlightsResult;
