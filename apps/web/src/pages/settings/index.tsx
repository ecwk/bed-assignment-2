import {
  Flex,
  Grid,
  VStack,
  Box,
  Heading,
  StackProps,
  Divider,
  BoxProps,
  Img,
  useColorModeValue,
  GridProps,
  Text
} from '@chakra-ui/react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { Fragment } from 'react';
import { capitalize } from 'lodash';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { Link, CustomBreadcrumb, Title } from '@common/components';

type NavigationItem = {
  name: string;
  href: string;
  links: {
    name: string;
    src: string;
    href: string;
  }[];
};

export const navigationItems: NavigationItem[] = [
  {
    name: 'Account',
    href: '/settings/account',

    links: [
      {
        name: 'Profile',
        src: '/images/personal-information.svg',
        href: '/settings/account/profile'
      },
      {
        name: 'Preferences',
        src: '/images/selection.svg',
        href: '/settings/account/preferences'
      },
      {
        name: 'Privacy',
        src: '/images/personal-information.svg',
        href: '/settings/account/privacy'
      },
      {
        name: 'Bookings',
        src: '/images/personal-information.svg',
        href: '/settings/account/bookings'
      }
    ]
  },
  {
    name: 'Billing',
    href: '/settings/billing',
    links: [
      {
        name: 'Payment',
        src: '/images/personal-information.svg',
        href: '/settings/billing/payment'
      },
      {
        name: 'Discounts',
        src: '/images/personal-information.svg',
        href: '/settings/billing/discounts'
      }
    ]
  },
  {
    name: 'Others',
    href: '/settings/others',
    links: [
      {
        name: 'Notifications',
        src: '/images/personal-information.svg',
        href: '/settings/others/notifications'
      }
    ]
  }
];

type SettingsProps = {};

// TODO: Create a reusable card component for the following

const Settings: NextPage<SettingsProps> = () => {
  return (
    <Main>
      <Sidebar />
      <Section
        title="Settings"
        subtitle="Change your application settings here"
      >
        {navigationItems.map(({ name, links }, index) => (
          <Box key={`navigation-item-${index}`}>
            <Heading mb={2} as="h2" size="md">
              {name}
            </Heading>
            <Grid gridTemplateColumns="1fr 1fr 1fr" gap={5}>
              {links.map(({ name, src, href }, index) => (
                <NextLink key={`navigation-item-link-${index}`} href={href}>
                  <Flex
                    as={motion.div}
                    whileHover={{ scale: 1.05 }}
                    flexDir="column"
                    border="1px solid"
                    borderRadius="lg"
                    borderColor="gray.600"
                    background="gray.900"
                    cursor="pointer"
                  >
                    <Img
                      src={src}
                      alt={name}
                      borderTopRadius="lg"
                      objectFit="cover"
                      h="200px"
                      backgroundColor="gray.400"
                    />
                    <Box p={4}>
                      <Heading as="h3" size="sm" fontWeight="semibold">
                        {capitalize(name)}
                      </Heading>
                    </Box>
                  </Flex>
                </NextLink>
              ))}
            </Grid>
          </Box>
        ))}
      </Section>
    </Main>
  );
};

export type MainProps = GridProps & {
  children?: React.ReactNode;
};

export const Main = ({ children, ...gridProps }: MainProps) => {
  return (
    <Grid
      as="main"
      my="80px"
      justifyContent="center"
      gridTemplateAreas={`
          "sidebar section"
          `}
      gridTemplateColumns="250px 1fr"
      gridColumnGap={5}
      px={{
        base: 4,
        sm: 5
      }}
      maxW="1200px"
      w="100%"
      mx="auto"
      {...gridProps}
    >
      {children}
    </Grid>
  );
};

type SidebarProps = StackProps & {
  children?: React.ReactNode;
};

export const Sidebar = ({ ...stackProps }: SidebarProps) => {
  const backgroundColor = useColorModeValue(
    'brandPaleBlue.100',
    'brandPaleBlue.700'
  );

  return (
    <VStack
      as="aside"
      gridArea="sidebar"
      alignItems="flex-start"
      spacing={6}
      backgroundColor={backgroundColor}
      borderRadius="lg"
      py={8}
      px={6}
      h="max-content"
      {...stackProps}
    >
      <Heading as="h3" size="md" pl={1}>
        <Link href="/settings">Settings</Link>
      </Heading>
      {navigationItems.map(({ name, href, links }, i) => (
        <Fragment key={`sidebar-${name}`}>
          <VStack as="nav" pl={3} alignItems="flex-start">
            <Link href={href} fontSize="md" fontWeight="bold" color="gray.400">
              {capitalize(name)}
            </Link>

            {links.map(({ name, href }, j) => (
              <motion.div
                key={`sidebar-link-${name}`}
                whileHover={{
                  x: 2
                }}
              >
                <Link color="gray.300" pl={2} href={href} fontSize="sm">
                  {capitalize(name)}
                </Link>
              </motion.div>
            ))}
          </VStack>
          {i !== navigationItems.length - 1 && <Divider />}
        </Fragment>
      ))}
    </VStack>
  );
};

type SectionProps = BoxProps & {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export const Section = ({
  title,
  subtitle,
  children,
  ...boxProps
}: SectionProps) => {
  const router = useRouter();

  const backgroundColor = useColorModeValue(
    'brandPaleBlue.100',
    'brandPaleBlue.700'
  );

  return (
    <Grid
      as={motion.section}
      gridTemplateAreas={`
          "header"
          "content"
        `}
      gridRowGap={10}
      gridArea="section"
      p={10}
      h="max-content"
      backgroundColor={backgroundColor}
      borderRadius="lg"
      key={router.pathname}
      variants={{
        hidden: { opacity: 0, x: -200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 }
      }}
      initial="hidden"
      animate="enter"
      transition={{ type: 'linear' }}
    >
      <Box gridArea="header">
        <CustomBreadcrumb />
        <Title mt={2} title={title} subtitle={subtitle} />
      </Box>
      <Box gridArea="content" {...boxProps}>
        {children}
      </Box>
    </Grid>
  );
};

export default Settings;
