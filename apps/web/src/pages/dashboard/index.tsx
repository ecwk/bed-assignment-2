import { type NextPage } from 'next';
import {
  Box,
  Grid,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { BiUser } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import { AddIcon } from '@chakra-ui/icons';
import { TbDiscount } from 'react-icons/tb';
import { RiBuilding3Fill } from 'react-icons/ri';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdCreditCard, MdAirplaneTicket, MdFlight } from 'react-icons/md';

import { useAuth } from '@modules/auth';
import { H2, Link, Main, Profile, Title } from '@common/components';

const Dashboard: NextPage = () => {
  const { user, isAdmin } = useAuth();

  return (
    <Main>
      <Title
        mt={10}
        title="Dashboard"
        subtitle="Everything you need to know can be found here"
      />
      <Profile mt={10} user={user} />
      {isAdmin && (
        <Grid
          as="section"
          mt={10}
          gridTemplateColumns="repeat(auto-fill, minmax(350px, 1fr))"
          gap={5}
        >
          <Box as="header" gridColumn="1 / -1">
            <H2>Admin</H2>
          </Box>
          <DashboardItem
            href="/admin/add/flights"
            icon={<AddIcon fontSize="60px" />}
            stat="Add New Flights"
            helperText="Easy-to-use booking engine"
            stat1={{ stat: 'Total Flights', number: 4021 }}
          />
          <DashboardItem
            href="/admin/add/airports"
            icon={<AddIcon fontSize="60px" />}
            stat="Add New Airports"
            helperText="Find out more about airports"
            stat1={{ stat: 'Total Airports', number: 24 }}
          />
        </Grid>
      )}
      <Grid
        as="section"
        mt={10}
        gridTemplateColumns="repeat(auto-fill, minmax(350px, 1fr))"
        gap={5}
      >
        <Box as="header" gridColumn="1 / -1">
          <H2>Services</H2>
        </Box>
        <DashboardItem
          href="/search?type=flight"
          icon={<MdFlight fontSize="64px" />}
          stat="Book A Flight"
          helperText="Easy-to-use booking engine"
          stat1={{ stat: 'Total Flights', number: 4021 }}
        />
        <DashboardItem
          href="/search?type=airport"
          icon={<RiBuilding3Fill fontSize="64px" />}
          stat="Discover Airports"
          helperText="Find out more about airports"
          stat1={{ stat: 'Total Airports', number: 24 }}
        />
        <DashboardItem
          href="/search?type=user"
          icon={<FaUsers fontSize="64px" />}
          stat="Find Users"
          helperText="Real-time users lookup"
          stat1={{ stat: 'Total Users', number: 101231 }}
          stat2={{ stat: 'Users Online', number: 376 }}
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
          stat1={{ stat: 'Last Updated', helperText: '2 days ago' }}
          stat2={{ stat: 'Created On', helperText: '2 March 2022' }}
        />
        <DashboardItem
          icon={<MdAirplaneTicket fontSize="64px" />}
          stat="Bookings"
          stat1={{ stat: 'Upcoming Flights', number: 24 }}
          stat2={{ stat: 'Previous Flights', number: 376 }}
        />
        <DashboardItem
          href="/cart"
          icon={<AiOutlineShoppingCart fontSize="64px" />}
          stat="Cart"
          stat1={{ stat: 'Total Items', number: 6 }}
          stat2={{ stat: 'Total Price', number: '$374.00' }}
        />
        <DashboardItem
          icon={<TbDiscount fontSize="64px" />}
          stat="Discounts"
          stat1={{ stat: 'Your Discounts', number: 3 }}
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
  icon: React.ReactElement;
  stat1?: Stat;
  stat2?: Stat;
};

const DashboardItem = ({
  href = '#',
  icon,
  stat,
  number,
  helperText,
  stat1,
  stat2
}: DashboardItemProps) => {
  const backgroundColor = useColorModeValue('brandGray.50', 'brandGray.900');
  const borderColor = useColorModeValue('brandGray.200', 'brandGray.700');
  const labelColor = useColorModeValue('brandGray.600', 'brandGray.200');
  const helpColor = useColorModeValue('black', 'brandGray.300');
  const numberColor = useColorModeValue('brandGray.600', 'brandGray.100');

  return (
    <Link href={href}>
      <Flex
        as={motion.article}
        justifyContent="space-between"
        backgroundColor={backgroundColor}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="xl"
        boxShadow="3px 4px 4px rgba(0, 0, 0, 0.25)"
        p={5}
        h="200px"
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
          y: 10
        }}
      >
        <Flex flexDir="column" justifyContent="space-between">
          {icon}
          <Stat flex="none">
            <StatNumber color="brandGray.100">{number}</StatNumber>
            <StatHelpText mb={0}>{helperText}</StatHelpText>
            <StatLabel fontSize="2xl" fontWeight="normal">
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
              {stat1.number && (
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
              {stat2.number && (
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
