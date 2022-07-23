import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Checkbox,
  useColorModeValue,
  HStack,
  useTheme,
  VStack,
  Box,
  Text
} from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import { AxiosError } from 'axios';
import { forwardRef, useState, type ComponentPropsWithoutRef } from 'react';

import { server } from '@config/axios';
import { Flight } from '@modules/flights';
import { FlightSearchForm } from '@modules/flights';

type ServerSideProps = {
  flights: Flight[] | null;
};

type FlightsProps = ServerSideProps & {};

const Flights: NextPage<FlightsProps> = ({ flights }) => {
  if (!flights) {
    return <></>;
  }

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      my="80px"
      maxW="1000px"
      mx="auto"
    >
      <Heading w="100%">Book A Flight</Heading>
      <FlightSearchForm flights={flights} />
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.token;
  let flights: Flight[] | null;
  if (!token) {
    flights = null;
  } else {
    try {
      server.defaults.headers.common.Authorization = `Bearer ${token}`;
      const res = await server.get('/flights');
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
      flights: flights
    }
  };
};

export default Flights;
