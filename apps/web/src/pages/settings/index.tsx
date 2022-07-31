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
  GridProps
} from '@chakra-ui/react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { Fragment } from 'react';
import { capitalize } from 'lodash';

import { getMockImage } from '@common/utils';
import { Link, CustomBreadcrumb } from '@common/components';

type NavigationItem = {
  name: string;
  links: {
    name: string;
    src: string;
    href: string;
  }[];
};

const navigationItems: NavigationItem[] = [
  {
    name: 'Account',
    links: [
      { name: 'Profile', src: getMockImage(), href: '/settings/profile' },
      {
        name: 'Preferences',
        src: getMockImage(),
        href: '/settings/preferences'
      },
      { name: 'Privacy', src: getMockImage(), href: '/settings/privacy' },
      { name: 'Orders', src: getMockImage(), href: '/settings/orders' }
    ]
  },
  {
    name: 'Billing',
    links: [
      { name: 'Payment', src: getMockImage(), href: '/settings/payment' },
      {
        name: 'Subscriptions',
        src: getMockImage(),
        href: '/settings/subscriptions'
      },
      { name: 'Discounts', src: getMockImage(), href: '/settings/discounts' }
    ]
  },
  {
    name: 'Others',
    links: [
      {
        name: 'Notifications',
        src: getMockImage(),
        href: '/settings/notifications'
      }
    ]
  }
];

type SettingsProps = {};

const Settings: NextPage<SettingsProps> = () => {
  return (
    <GridContainer maxW="1200px">
      <Title />
      <Sidebar />
      <Section>
        <Heading as="h1" size="xl">
          Settings
        </Heading>
        {navigationItems.map(({ name, links }, index) => (
          <Box key={`navigation-item-${index}`}>
            <Heading mt={10} mb={2} as="h2" size="md">
              {name}
            </Heading>
            <Grid gridTemplateColumns="1fr 1fr 1fr" gap={5}>
              {links.map(({ name, src, href }, index) => (
                <NextLink key={`navigation-item-link-${index}`} href={href}>
                  <Flex
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
    </GridContainer>
  );
};

export type GridContainerProps = GridProps & {
  children?: React.ReactNode;
};

export const GridContainer = ({
  children,
  ...gridProps
}: GridContainerProps) => {
  return (
    <Grid
      as="main"
      my="40px"
      justifyContent="center"
      gridTemplateAreas={`
        "title title"
        "sidebar section"
        `}
      gridTemplateColumns="200px 1fr"
      gridRowGap={6}
      gridColumnGap={5}
      px={{
        base: 4,
        sm: 5
      }}
      maxW="1500px"
      w="100%"
      mx="auto"
      {...gridProps}
    >
      {children}
    </Grid>
  );
};

export type TitleProps = BoxProps & {};

export const Title = ({ ...boxProps }: TitleProps) => {
  return (
    <Box as="header" gridArea="title" {...boxProps}>
      <CustomBreadcrumb />
    </Box>
  );
};

type SidebarProps = StackProps & {
  children?: React.ReactNode;
};

export const Sidebar = ({ ...stackProps }: SidebarProps) => {
  return (
    <VStack
      as="aside"
      gridArea="sidebar"
      {...stackProps}
      alignItems="flex-start"
      spacing={6}
    >
      {navigationItems.map(({ name, links }, i) => (
        <Fragment key={`sidebar-${name}`}>
          <VStack as="nav" alignItems="flex-start">
            <Heading size="md" fontWeight="bold">
              {capitalize(name)}
            </Heading>
            {links.map(({ name, href }, j) => (
              <Link color="gray.300" href={href} key={`sidebar-link-${name}`}>
                {capitalize(name)}
              </Link>
            ))}
          </VStack>
          {i !== navigationItems.length - 1 && <Divider />}
        </Fragment>
      ))}
    </VStack>
  );
};

type SectionProps = StackProps & {
  children?: React.ReactNode;
};

export const Section = ({ children, ...stackProps }: SectionProps) => {
  const backgroundColor = useColorModeValue(
    'brandPaleBlue.100',
    'brandPaleBlue.700'
  );

  return (
    <Flex
      as="section"
      gridArea="section"
      flexDir="column"
      backgroundColor={backgroundColor}
      borderRadius="xl"
      p={10}
      {...stackProps}
    >
      {children}
    </Flex>
  );
};

export default Settings;
