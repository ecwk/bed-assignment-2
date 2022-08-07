import { GetServerSideProps, type NextPage } from 'next';
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';
import {
  Box,
  Grid,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
  useDisclosure,
  Portal,
  Button
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { BiUser } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import { AddIcon } from '@chakra-ui/icons';
import { TbDiscount } from 'react-icons/tb';
import { RiBuilding3Fill } from 'react-icons/ri';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import {
  MdCreditCard,
  MdAirplaneTicket,
  MdFlight,
  MdAdminPanelSettings
} from 'react-icons/md';

import { useAuth } from '@modules/auth';
import { H2, H3, Link, Main, Profile, Title } from '@common/components';
import { CreateFlightModal } from '@modules/flights';
import { CreateAirportModal } from '@modules/airports';
import { useRef, useState } from 'react';
import { server } from '@config/axios';
import { env } from '@config/env';
import { AxiosError } from 'axios';
import { random } from 'lodash';
import dayjs from 'dayjs';
import ms from 'ms';
import { useCart } from '@common/hooks';

const Dashboard: NextPage<ServerSideProps> = ({
  flightsCount,
  airportsCount,
  usersCount
}) => {
  const { user, isAdmin } = useAuth();
  const { cart } = useCart();
  const createFlightDisclosure = useDisclosure();
  const createAirportDisclosure = useDisclosure();

  return (
    <Main>
      <Title
        mt={10}
        title="Dashboard"
        subtitle="Everything you need can be found here"
      />
      <Profile mt={10} user={user} />
      {isAdmin && (
        <Flex flexDir="column" mt={10} as="section">
          <Box as="header" gridColumn="1 / -1">
            <H2>Admin</H2>
          </Box>
          <H3 mt={5}>Functions</H3>
          <Grid
            mt={4}
            as="section"
            gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
            gap={5}
          >
            <Portal>
              <CreateFlightModal disclosure={createFlightDisclosure} />
              <CreateAirportModal disclosure={createAirportDisclosure} />
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
              icon={<AddIcon fontSize="35px" />}
              stat="Add User"
              h="125px"
              fontSize="lg"
            />
            <DashboardItem
              icon={<AddIcon fontSize="35px" />}
              stat="Add Discount"
              h="125px"
              fontSize="lg"
            />
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
      )}
      <Grid
        as="section"
        mt={10}
        gridTemplateColumns="repeat(auto-fill, minmax(350px, 1fr))"
        gap={5}
      >
        <Box as="header" gridColumn="1 / -1">
          <H2>Customer</H2>
        </Box>
        <DashboardItem
          href="/search?type=flight"
          icon={<MdFlight fontSize="64px" />}
          stat="Book A Flight"
          helperText="Easy-to-use booking engine"
          stat1={{ stat: 'Total Flights', number: flightsCount }}
        />
        <DashboardItem
          href="/search?type=airport"
          icon={<RiBuilding3Fill fontSize="64px" />}
          stat="Discover Airports"
          helperText="Find out more about airports"
          stat1={{ stat: 'Total Airports', number: airportsCount }}
        />
        <DashboardItem
          href="/search?type=user"
          icon={<FaUsers fontSize="64px" />}
          stat="Find Users"
          helperText="Real-time users lookup"
          stat1={{ stat: 'Total Users', number: usersCount || 0 }}
          stat2={{
            stat: 'Users Online',
            number: Math.floor(
              random(0.2 * (usersCount || 0), 0.8 * (usersCount || 0))
            )
          }}
        />
      </Grid>
      <Grid
        as="section"
        mt={10}
        gridTemplateColumns="repeat(auto-fill, minmax(350px, 1fr))"
        gap={5}
      >
        <Box as="header" gridColumn="1 / -1">
          <H2>Account</H2>
        </Box>
        <DashboardItem
          href="/settings/account/profile"
          icon={<BiUser fontSize="64px" />}
          stat="Profile"
          stat1={{
            stat: 'Last Updated',
            // x seconds ago / x minutes ago  / x days ago / x weeks ago / x months ago / x years ago
            helperText: user?.lastModifiedOn
              ? ms(dayjs(user?.lastModifiedOn).diff(dayjs()), {
                  long: true
                }).replace('-', '') + ' ago'
              : '-'
          }}
          stat2={{
            stat: 'Created On',
            helperText: user?.createdOn
              ? dayjs(user.createdOn).format('D MMMM YYYY')
              : '-'
          }}
        />
        <DashboardItem
          icon={<MdAirplaneTicket fontSize="64px" />}
          stat="Bookings"
          stat1={{ stat: 'Upcoming Bookings', number: 0 }}
          stat2={{ stat: 'Previous Bookings', number: 0 }}
        />
        <DashboardItem
          href="/cart"
          icon={<AiOutlineShoppingCart fontSize="64px" />}
          stat="Cart"
          stat1={{ stat: 'Total Items', number: cart.length }}
          stat2={{
            stat: 'Total Price',
            number: 'SGD ' + cart.reduce((a, b) => a + b.price, 0)
          }}
        />
        <DashboardItem
          icon={<TbDiscount fontSize="64px" />}
          stat="Discounts"
          stat1={{ stat: 'Your Discounts', number: 0 }}
        />
        <DashboardItem
          href="/settings/billing/payment"
          icon={<MdCreditCard fontSize="64px" />}
          stat="Payment"
          helperText={`Registered cards`}
          stat1={{ stat: 'Credit Card', helperText: 'VISA 4218 **** 2774' }}
          stat2={{
            stat: 'Credit Card',
            helperText: 'MasterCard 4218 **** 6080'
          }}
        />
      </Grid>
    </Main>
  );
};

type Stat = {
  stat?: string;
  number?: string | number;
  helperText?: string;
};

type DashboardItemProps = Stat & {
  href?: string;
  onClick?: () => void;
  icon: React.ReactElement;
  stat1?: Stat;
  stat2?: Stat;
  h?: number | string;
  fontSize?: string;
};

export const DashboardItem = ({
  href,
  icon,
  stat,
  number,
  helperText,
  stat1,
  stat2,
  onClick,
  h,
  fontSize
}: DashboardItemProps) => {
  const backgroundColor = useColorModeValue('brandGray.50', 'brandGray.900');
  const borderColor = useColorModeValue('brandGray.200', 'brandGray.700');
  const labelColor = useColorModeValue('brandGray.600', 'brandGray.200');
  const helpColor = useColorModeValue('black', 'brandGray.300');
  const numberColor = useColorModeValue('brandGray.600', 'brandGray.100');

  return (
    <Link as={!href ? 'div' : 'a'} href={href} onClick={onClick}>
      <Flex
        as={motion.article}
        justifyContent="space-between"
        backgroundColor={backgroundColor}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="xl"
        boxShadow="3px 4px 4px rgba(0, 0, 0, 0.25)"
        p={5}
        h={h || '200px'}
        sx={{
          svg: {
            transition: 'all 0.2s'
          }
        }}
        _hover={{
          svg: {
            transition: 'all 0.2s',
            color: 'brandGold.300',
            transform: 'scale(1.2)'
          }
        }}
        whileHover={{
          y: -5
        }}
        whileTap={{
          y: 5
        }}
      >
        <Flex flexDir="column" justifyContent="space-between">
          {icon}
          <Stat flex="none">
            <StatNumber color="brandGray.100">{number}</StatNumber>
            <StatHelpText mb={0}>{helperText}</StatHelpText>
            <StatLabel fontSize={fontSize || '2xl'} fontWeight="normal">
              {stat}
            </StatLabel>
          </Stat>
        </Flex>
        <Flex flexDir="column" justifyContent="space-between">
          {stat1 && (
            <Stat flex="none" mt={1}>
              <StatLabel color={labelColor} fontWeight="normal">
                {stat1.stat}
              </StatLabel>
              {(stat1.number || stat1.number === 0) && (
                <StatNumber color={numberColor}>{stat1.number}</StatNumber>
              )}
              {stat1.helperText && (
                <StatHelpText color={helpColor}>
                  {stat1.helperText}
                </StatHelpText>
              )}
            </Stat>
          )}
          {stat2 && (
            <Stat flex="none">
              <StatLabel color={labelColor} fontWeight="normal">
                {stat2.stat}
              </StatLabel>
              {(stat2.number || stat2.number === 0) && (
                <StatNumber color={numberColor}>{stat2.number}</StatNumber>
              )}
              {stat2.helperText && (
                <StatHelpText color={helpColor}>
                  {stat2.helperText}
                </StatHelpText>
              )}
            </Stat>
          )}
        </Flex>
      </Flex>
    </Link>
  );
};

export default Dashboard;

type ServerSideProps = {
  flightsCount: number;
  airportsCount: number;
  usersCount: number | null;
};
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (
  ctx
) => {
  const token = ctx.req.cookies.token || '';
  server.defaults.headers.common.Authorization = `Bearer ${token}`;

  let usersCount = null;
  try {
    const { data } = await server.get('/users/count?limit=none');
    usersCount = data.count;
  } catch (err) {
    if (err instanceof AxiosError) {
    } else {
      console.error(err);
    }
  }

  const {
    data: { count: flightsCount }
  } = await server.get('/flights/count?limit=none');
  const {
    data: { count: airportsCount }
  } = await server.get('/airports/count?limit=none');

  return {
    props: {
      flightsCount,
      airportsCount,
      usersCount
    }
  };
};
