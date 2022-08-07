import { type NextPage } from 'next';
import { AddIcon } from '@chakra-ui/icons';
import { MdAdminPanelSettings } from 'react-icons/md';
import { Box, Flex, Grid, Portal, useDisclosure } from '@chakra-ui/react';

import { useAuth } from '@modules/auth';
import { DashboardItem } from '../dashboard';
import { CreateUserModal } from '@modules/users';
import { CreateFlightModal } from '@modules/flights';
import { CreateAirportModal } from '@modules/airports';
import { H2, H3, Main, Profile, Title } from '@common/components';

const Admin: NextPage = () => {
  const { user } = useAuth();

  const createFlightDisclosure = useDisclosure();
  const createAirportDisclosure = useDisclosure();
  const createUserDisclosure = useDisclosure();

  return (
    <Main>
      <Title
        mt={10}
        title={`Hello, ${user?.username}`}
        subtitle="This page contains your administrative functions"
      />
      <Profile mt={10} user={user} />
      <Flex flexDir="column" mt={10} as="section">
        <Box as="header" gridColumn="1 / -1">
          <H2>Admin</H2>
        </Box>
        <H3 mt={5}>Functions</H3>
        <Grid
          mt={4}
          as="section"
          gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
          gap={5}
        >
          <Portal>
            <CreateFlightModal disclosure={createFlightDisclosure} />
            <CreateAirportModal disclosure={createAirportDisclosure} />
            <CreateUserModal disclosure={createUserDisclosure} />
          </Portal>
          <DashboardItem
            onClick={createFlightDisclosure.onOpen}
            icon={<AddIcon fontSize="30px" />}
            stat="Add Flight"
            h="125px"
            fontSize="lg"
          />
          <DashboardItem
            onClick={createAirportDisclosure.onOpen}
            icon={<AddIcon fontSize="35px" />}
            stat="Add Airport"
            h="125px"
            fontSize="lg"
          />
          <DashboardItem
            onClick={createUserDisclosure.onOpen}
            icon={<AddIcon fontSize="35px" />}
            stat="Add User"
            h="125px"
            fontSize="lg"
          />
          {/* <DashboardItem
            icon={<AddIcon fontSize="35px" />}
            stat="Add Discount"
            h="125px"
            fontSize="lg"
          /> */}
        </Grid>
        <H3 mt={5}>Services</H3>
        <Grid
          as="section"
          mt={4}
          gridTemplateColumns="repeat(auto-fill, minmax(350px, 1fr))"
          gap={5}
        >
          <DashboardItem
            href="/admin/flights"
            icon={<MdAdminPanelSettings fontSize="60px" />}
            stat="Manage Flights"
            helperText="View, edit, and delete Flights"
          />
          <DashboardItem
            href="/admin/airports"
            icon={<MdAdminPanelSettings fontSize="60px" />}
            stat="Manage Airports"
            helperText="View, edit, and delete Airports"
          />
          <DashboardItem
            href="/admin/users"
            icon={<MdAdminPanelSettings fontSize="60px" />}
            stat="Manage Users"
            helperText="View, edit, and delete Users"
          />
          <DashboardItem
            href="/admin/bookings"
            icon={<MdAdminPanelSettings fontSize="60px" />}
            stat="Manage Bookings"
            helperText="View, edit, and delete Bookings"
          />
        </Grid>
      </Flex>
    </Main>
  );
};

export default Admin;
