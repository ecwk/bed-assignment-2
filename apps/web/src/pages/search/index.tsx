import { AxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';

import { server } from '@config/axios';
import { type Airport } from '@common/types';
import { FlightSearchForm } from '@modules/flights';

type BookFlightProps = ServerSideProps & {};

const BookFlight: NextPage<BookFlightProps> = ({ airports }) => {
  return (
    <Box
      px={{
        base: 2,
        sm: 5,
        xl: 10
      }}
    >
      <Tabs isFitted sx={sx.tabs}>
        <TabList>
          <Tab>Flight</Tab>
          <Tab>Airports</Tab>
          <Tab>Users</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <FlightSearchForm airports={airports || []} />
          </TabPanel>
          <TabPanel>Airport</TabPanel>
          <TabPanel>Users</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

const sx = {
  tabs: {
    my: '80px',
    maxW: '1000px',
    w: '100%',
    py: 10,
    px: {
      base: 4,
      sm: 6,
      md: 10
    },
    mx: 'auto',
    background: 'brandPaleBlue.700',
    borderRadius: 'xl'
  }
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
