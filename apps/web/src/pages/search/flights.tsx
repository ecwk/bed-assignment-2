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
  Link,
  Divider
} from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import { Wrap, WrapItem } from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { FaArrowRight } from 'react-icons/fa';
import NextLink from 'next/link';
import { BiLinkExternal } from 'react-icons/bi';
import { Indicator } from '@mantine/core';
import ms from 'ms';
import { Pagination } from '@mantine/core';
import { ChevronLeftIcon } from '@chakra-ui/icons';

import { server } from '@config/axios';
import { type Flight, type Airport } from '@common/types';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getMs } from '@common/utils';
import { AirportTitle, FlightItem } from '@modules/flights';

type FlightsSearchProps = ServerSideProps & {};

const SearchFlightsResult: NextPage<FlightsSearchProps> = ({
  flights,
  returnFlights,
  originAirport,
  destinationAirport
}) => {
  const [flightPage, setFlightPage] = useState(1);
  const [returnFlightPage, setReturnFlightPage] = useState(1);
  const router = useRouter();
  const isTwoWay = router.query.isTwoWay === 'true';
  const isDirect = router.query.isDirect === 'true';
  const { departureDate, returnDate } = router.query;
  const departureDateString =
    typeof departureDate === 'string' ? departureDate : '';
  const returnDateString = typeof returnDate === 'string' ? returnDate : '';

  return (
    <Flex flexDir="column" maxW="1000px" mx="auto" my="80px">
      <Box>
        <NextLink href="/search">
          <Button
            variant="ghost"
            leftIcon={<ChevronLeftIcon w="20px" h="20px" />}
          >
            Back
          </Button>
        </NextLink>
      </Box>
      <Flex
        sx={{
          flexDir: 'column',
          background: 'brandPaleBlue.700',
          borderRadius: 'xl',
          '&>*': {
            px: 10
          },
          justifyContent: 'center',
          mt: 2
        }}
      >
        <Flex justifyContent="space-around" my={16}>
          <AirportTitle
            type="departure"
            airport={originAirport}
            airportDepatureDate={departureDateString}
          />
          <FaArrowRight size="30px" style={{ alignSelf: 'center' }} />
          <AirportTitle airport={destinationAirport} />
        </Flex>
        <Grid
          borderTop="1px solid"
          borderColor="gray.600"
          gridTemplateColumns="repeat(3, 1fr)"
          gridGap={10}
        >
          {flights
            .slice((flightPage - 1) * 3, flightPage * 3)
            .map((flight, index) => (
              <GridItem key={flight.flightId} mt={5}>
                <FlightItem flight={flight} />
              </GridItem>
            ))}
        </Grid>
        <Pagination
          sx={{
            justifyContent: 'center',
            marginTop: '20px',
            marginBottom: '40px'
          }}
          page={flightPage}
          onChange={setFlightPage}
          total={Math.ceil(flights.length / 3)}
        />
      </Flex>
      {isTwoWay && (
        <Flex
          sx={{
            flexDir: 'column',
            background: 'brandPaleBlue.700',
            borderRadius: 'xl',
            '&>*': {
              px: 10
            },
            justifyContent: 'center',
            mt: 20
          }}
        >
          <Flex justifyContent="space-around" my={16}>
            <AirportTitle
              type="departure"
              airport={destinationAirport}
              airportDepatureDate={returnDateString}
            />
            <FaArrowRight size="30px" style={{ alignSelf: 'center' }} />
            <AirportTitle airport={originAirport} />
          </Flex>
          <Grid
            borderTop="1px solid"
            borderColor="gray.600"
            gridTemplateColumns="repeat(3, 1fr)"
            gridGap={10}
          >
            {returnFlights
              ?.slice((returnFlightPage - 1) * 3, returnFlightPage * 3)
              .map((flight) => (
                <GridItem key={flight.flightId} mt={5}>
                  <FlightItem flight={flight} />
                </GridItem>
              ))}
          </Grid>
          <Pagination
            sx={{
              justifyContent: 'center',
              marginTop: '20px',
              marginBottom: '40px'
            }}
            page={returnFlightPage}
            onChange={setReturnFlightPage}
            total={Math.ceil(returnFlights ? returnFlights.length / 3 : 0)}
          />
        </Flex>
      )}
    </Flex>
  );
};

type ServerSideProps = {
  flights: Flight[];
  returnFlights?: Flight[] | null;
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
  const flights = (await server.get(`/flights/direct/${from}/${to}`)).data
    .flights;
  const returnFlights =
    isTwoWay === 'true'
      ? (await server.get(`/flights/direct/${to}/${from}`)).data.flights
      : null;
  console.log(returnFlights);
  const originAirport = (await server.get(`/airports/${from}`)).data.airport;
  const destinationAirport = (await server.get(`/airports/${to}`)).data.airport;

  return {
    props: {
      flights,
      returnFlights,
      originAirport,
      destinationAirport
    }
  };
};

export default SearchFlightsResult;
