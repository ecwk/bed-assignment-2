import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Grid,
  Wrap,
  FormControl,
  FormLabel,
  IconButton,
  Text,
  HStack,
  useColorModeValue,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { NextPage, type GetServerSideProps } from 'next';
import { TbLayoutGrid, TbLayoutList } from 'react-icons/tb';

import { server } from '@config/axios';
import { Main, Title } from '@common/components';
import { type Flight, type Airport } from '@common/types';
import { FlightItem } from '@modules/flights';
import { random, shuffle } from 'lodash';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';

type FlightsProps = ServerSideProps & {};

const Flights: NextPage<FlightsProps> = ({
  flights: flightsRaw,
  returnFlights: returnFlightsRaw,
  originAirport: origin,
  destinationAirport: destination
}) => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const flights = useMemo(() => {
    return shuffle([
      ...flightsRaw,
      ...flightsRaw,
      ...flightsRaw,
      ...flightsRaw
    ]);
  }, []);

  const returnFlights = useMemo(() => {
    if (returnFlightsRaw) {
      return shuffle([
        ...returnFlightsRaw,
        ...returnFlightsRaw,
        ...returnFlightsRaw,
        ...returnFlightsRaw
      ]);
    }
    return [];
  }, []);

  const labelColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <Main maxW="1200px" w="100%" mx="auto">
      <Title
        mt={10}
        title="Flight Search Results"
        subtitle="Here are your search results"
      />
      <Flex mt={5} alignItems="flex-end" gap={4}>
        <FormControl>
          <FormLabel color={labelColor}>Refine Your Search</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
            <Input placeholder="Search" />
          </InputGroup>
        </FormControl>

        <FormControl flexBasis="300px">
          <FormLabel color={labelColor}>Aircraft</FormLabel>
          <Select defaultValue="all">
            <option value="boeing">Boeing</option>
            <option value="airbus">Airbus</option>
            <option value="others">Others</option>
            <option value="all">All</option>
          </Select>
        </FormControl>
        <FormControl flexBasis="300px">
          <FormLabel color={labelColor}>Price</FormLabel>
          <Select placeholder="$ 1000 - 2000" />
        </FormControl>
      </Flex>

      <Flex justifyContent="flex-end" alignItems="center" mt={4} gap={2}>
        <HStack>
          <Text color="gray.200" fontSize="sm">
            Sort By:{' '}
          </Text>
          <Select w="150px" size="sm" borderRadius="3xl" defaultValue="latest">
            <option value="latest">Latest</option>
            <option value="highest-price">Highest Price</option>
            <option value="lowest-price">Lowest Price</option>
          </Select>
        </HStack>
        <IconButton
          variant="ghost"
          aria-label="grid layout"
          icon={<TbLayoutGrid />}
          isActive={layout === 'grid'}
          onClick={() => setLayout('grid')}
        />
        <IconButton
          variant="ghost"
          aria-label="list layout"
          icon={<TbLayoutList />}
          isActive={layout === 'list'}
          onClick={() => setLayout('list')}
        />
      </Flex>
      <Tabs>
        <TabList>
          <Tab>Departure</Tab>
          <Tab>Return</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Grid
              mt={10}
              gridTemplateColumns={
                layout === 'grid'
                  ? 'repeat(auto-fill, minmax(300px, 1fr))'
                  : '1fr'
              }
              gap={10}
            >
              {flights.length > 0 ? (
                flights.map((flight, i) => (
                  <FlightItem
                    key={flight.flightCode + i}
                    flight={flight}
                    isTwoWay={true}
                    isDirect={false}
                    originAirport={origin}
                    destinationAirport={destination}
                    list={layout === 'list'}
                  />
                ))
              ) : (
                <Text
                  textAlign="center"
                  fontWeight="semibold"
                  gridColumn="1 / -1"
                >
                  No departure flights found...
                </Text>
              )}
            </Grid>
          </TabPanel>
          <TabPanel>
            <Grid
              mt={10}
              gridTemplateColumns={
                layout === 'grid'
                  ? 'repeat(auto-fill, minmax(300px, 1fr))'
                  : '1fr'
              }
              gap={10}
            >
              {returnFlights.length > 0 ? (
                returnFlights?.map((flight, i) => (
                  <FlightItem
                    key={flight.flightCode + i}
                    flight={flight}
                    isTwoWay={true}
                    isDirect={false}
                    originAirport={origin}
                    destinationAirport={destination}
                    list={layout === 'list'}
                  />
                ))
              ) : (
                <Text
                  textAlign="center"
                  fontWeight="semibold"
                  gridColumn="1 / -1"
                >
                  No return flights found...
                </Text>
              )}
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Main>
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
  const { departureDate, returnDate, from, to, isTwoWay } = ctx.query;
  if (
    !(from && to && departureDate) ||
    typeof departureDate !== 'string' ||
    typeof from !== 'string' ||
    typeof to !== 'string' ||
    (returnDate && typeof returnDate !== 'string') ||
    (isTwoWay && typeof isTwoWay !== 'string')
  ) {
    return {
      redirect: {
        destination: '/search',
        permanent: false
      }
    };
  }

  const departure = new Date(departureDate).toDateString();
  const return_ = returnDate ? new Date(returnDate).toDateString() : '';
  const isTwoWay_ = isTwoWay === 'true';

  const flightsRes = await server.get(
    `/flights/direct/${from}/${to}?date=${departure}&dateFilterType=exact`
  );
  const returnFlightsRes = isTwoWay_
    ? await server.get(
        `/flights/direct/${to}/${from}?date=${return_}&dateFilterType=exact`
      )
    : null;
  const originRes = await server.get(`/airports/${from}`);
  const destinationRes = await server.get(`/airports/${to}`);

  return {
    props: {
      flights: flightsRes.data.flights,
      returnFlights: returnFlightsRes?.data.flights ?? null,
      originAirport: originRes.data.airport,
      destinationAirport: destinationRes.data.airport
    }
  };
};

export default Flights;
