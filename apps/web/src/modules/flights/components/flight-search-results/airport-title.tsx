import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  type BoxProps
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { AxiosError } from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import { FaArrowRight } from 'react-icons/fa';
import { BiLinkExternal } from 'react-icons/bi';
import { Indicator } from '@mantine/core';
import ms from 'ms';
import { Airport } from '@common/types';
import dayjs from 'dayjs';

type ResultHeadingProps = BoxProps & {
  airport: Airport;
  airportDepatureDate?: string;
  type?: 'departure' | 'return';
};

export const AirportTitle = ({
  airport,
  airportDepatureDate = '',
  type,
  ...boxProps
}: ResultHeadingProps) => {
  const { airportId, country, city, name } = airport;
  const departureDateString = dayjs(airportDepatureDate).isValid()
    ? dayjs(airportDepatureDate).format('DD MMMM YYYY')
    : '-';

  return (
    <Box {...boxProps}>
      <Heading size="xs" fontWeight="bold">
        <Text as="span" color="brandGold.200" fontWeight="semibold">
          {country.toUpperCase()}
        </Text>
        , {city.toUpperCase()}
      </Heading>
      <Heading size="lg" position="relative">
        <NextLink href={`/airports/${airportId}`} passHref>
          <Link display="flex" alignItems="center">
            <Text as="span">{name}</Text>
            <Box ml={1} mt={2} as="span">
              <BiLinkExternal size="16px" />
            </Box>
          </Link>
        </NextLink>
      </Heading>
      <Text fontWeight="normal">{departureDateString}</Text>
      <Text color="gray.400">
        {type === 'departure'
          ? 'Depature'
          : type === 'return' && departureDateString !== '-'
          ? 'Return'
          : ''}
      </Text>
    </Box>
  );
};
