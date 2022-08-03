import { AxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Heading,
  Text,
  Input
} from '@chakra-ui/react';

import { server } from '@config/axios';
import { type Airport } from '@common/types';
import { FlightSearchForm } from '@modules/flights';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Main, Title } from '@common/components';

const defaultIndex = {
  flight: 0,
  airport: 1,
  user: 2
};

type BookFlightProps = ServerSideProps & {};

const BookFlight: NextPage<BookFlightProps> = ({ airports }) => {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  // Read type query from url and set index
  useEffect(() => {
    const defaultIndex = {
      flight: 0,
      airport: 1,
      user: 2
    }?.[router.query?.type as string];
    setIndex(defaultIndex ?? 0);
  }, [router.query]);

  // Set index to default if no query is set
  useEffect(() => {
    const type = Object.keys(defaultIndex)[index];
    router.push(`/search?type=${type}`, `/search?type=${type}`, {
      shallow: true
    });
  }, [index]);

  const handleIndex = (index: number) => setIndex(index);

  return (
    <Main maxW="1200px" w="100%" mx="auto">
      <Title
        title="Search"
        subtitle="Search for flights, airports and users."
      />
      <Tabs mt={5} colorScheme="brandGold" index={index} onChange={handleIndex}>
        <TabList
          gap={5}
          sx={{
            '& > button:hover': {
              color: 'brandGold.500'
            }
          }}
        >
          <Tab>Flights</Tab>
          <Tab>Airports</Tab>
          <Tab>Users</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Heading as="h2" mt={5} size="lg" fontWeight="semibold">
              Catch Your Flight
            </Heading>
            <Text mt={2} color="gray.400">
              Find your next flight using our powerful search engine.
            </Text>
            <FlightSearchForm mt={10} airports={airports || []} />
          </TabPanel>
          <TabPanel>
            <Heading as="h2" mt={5} size="lg" fontWeight="semibold">
              Discover New Airports
            </Heading>
            <Text mt={2} color="gray.400">
              Find out more about the world's airports.
            </Text>
          </TabPanel>
          <TabPanel>
            <Heading as="h2" mt={5} size="lg" fontWeight="semibold">
              Look Up Users
            </Heading>
            <Text mt={2} color="gray.400">
              Find out more information on other users.
            </Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Main>
  );
};

type ServerSideProps = {
  airports: Airport[] | null;
};

export const getServerSideProps: GetServerSideProps<
  ServerSideProps
> = async () => {
  let airports: Airport[] | null;
  try {
    const res = await server.get('/airports');
    airports = res.data?.airports ?? null;
  } catch (err) {
    if (!(err instanceof AxiosError)) {
      console.error(err);
    }
    airports = null;
  }
  return {
    props: {
      airports
    }
  };
};

export default BookFlight;
