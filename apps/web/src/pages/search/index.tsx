import {
  Flex,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';

import { FlightSearchForm } from '@modules/flights';
import { type Airport } from '@common/types';
import { server } from '@config/axios';

type BookFlightProps = ServerSideProps & {};

const BookFlight: NextPage<BookFlightProps> = ({ airports }) => {
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      my="80px"
      maxW="1000px"
      mx="auto"
    >
      <Box w="100%" background="brandPaleBlue.700" borderRadius="xl" p={10}>
        <Tabs>
          <TabList>
            <Tab>Flight</Tab>
            <Tab>Airports</Tab>
            <Tab>Users</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FlightSearchForm airports={airports || []} />
            </TabPanel>
            <TabPanel>Airport</TabPanel>
            <TabPanel>Users</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
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
