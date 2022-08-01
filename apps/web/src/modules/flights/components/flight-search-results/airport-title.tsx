import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  type BoxProps
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import { Airport } from '@common/types';

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
          <Link display="flex" alignItems="center" justifyContent="flex-start">
            {name}
            <ExternalLinkIcon fontSize="xl" ml={2} />
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
