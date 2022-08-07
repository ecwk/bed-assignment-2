import { GetServerSideProps, NextPage } from 'next';
import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import jwt from 'jsonwebtoken';

import { H3, Main, Title } from '@common/components';
import { server } from '@config/axios';
import { Booking } from '@common/types';

const Bookings: NextPage<ServerSideProps> = ({ bookings }) => {
  console.log(bookings);
  return (
    <Main maxW="1000px" w="100%" mx="auto">
      <Title
        mt={10}
        title="Bookings"
        subtitle="View and manage your bookings here"
      />
      <Grid
        gap={10}
        mt={5}
        gridTemplateColumns="repeat(auto-fill, minmax(400px, 1fr))"
      >
        {bookings.length === 0 ? (
          <Text>You have no bookings</Text>
        ) : (
          bookings.map(
            ({ bookingId, flightId, name, nationality, passport }) => {
              return (
                <Flex
                  p={5}
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor="chakra-border-color"
                  backgroundColor="modal-bg"
                  flexDir="column"
                  key={'booking' + bookingId}
                  gap={2}
                >
                  <H3>{name}</H3>
                  <Text>Booking ID: {bookingId}</Text>
                  <Text>Flight ID: {flightId}</Text>
                  <Text>Nationality: {nationality}</Text>
                  <Text>Passport: {passport}</Text>
                </Flex>
              );
            }
          )
        )}
      </Grid>
    </Main>
  );
};

export default Bookings;

type ServerSideProps = {
  bookings: Booking[];
};

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  ctx
) => {
  const token = ctx.req.cookies.token || '';
  server.defaults.headers.common.Authorization = `Bearer ${token}`;

  const decodedToken = jwt.decode(token, { complete: true });
  const userId = decodedToken?.payload?.sub;

  const bookings = await server.get(`/bookings/${userId}`);
  return {
    props: {
      bookings: bookings.data.bookings
    }
  };
};
