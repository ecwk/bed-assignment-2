import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Checkbox,
  useColorModeValue,
  HStack,
  useTheme,
  VStack,
  Box,
  Text
} from '@chakra-ui/react';
import { Select } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { forwardRef, useState, type ComponentPropsWithoutRef } from 'react';

import { Flight } from '../types';
import { createFromData, createToData } from '../utils';

interface ItemProps extends ComponentPropsWithoutRef<'div'> {
  label: string;
  country: string;
  city: string;
  name: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, country, city, name, description, ...rest }: ItemProps, ref) => (
    <Box ref={ref} {...rest}>
      <Text fontSize="md" color="gray.900">
        {country}, {city}
      </Text>
      <Text fontSize="sm" color="gray.500">
        {name}
      </Text>
    </Box>
  )
);

type FlightSearchFormProps = {
  flights: Flight[];
};

export const FlightSearchForm = ({ flights }: FlightSearchFormProps) => {
  const [originId, setOriginId] = useState<number | null>(null);
  const [isOneWay, setIsOneWay] = useState<boolean>(false);
  const theme = useTheme();

  const colorModeButton = useColorModeValue(
    'lightModeButton',
    'darkModeButton'
  );

  return (
    <Grid
      as="form"
      mt={5}
      gridTemplateAreas={`
          "form stats"
          "button button"
        `}
      p={10}
      borderRadius="xl"
      background="brandPaleBlue.700"
      width="100%"
    >
      <GridItem area="form" display="flex" flexDir="column" gap={3}>
        <Select
          id="flight-from"
          sx={{
            label: {
              color: theme.colors.gray[200],
              fontSize: '15px',
              fontWeight: 'normal'
            }
          }}
          itemComponent={SelectItem}
          label="From"
          placeholder="Pick location"
          data={createFromData(flights)}
          searchable
          nothingFound="No Flights Found"
          onChange={(originAirportId) => setOriginId(Number(originAirportId))}
          filter={(query, item) =>
            item.label?.toLowerCase().includes(query.toLowerCase().trim()) ||
            item.country.toLowerCase().includes(query.toLowerCase().trim()) ||
            item.city.toLowerCase().includes(query.toLowerCase().trim()) ||
            item.name.toLowerCase().includes(query.toLowerCase().trim())
          }
          clearable
        />
        <Select
          id="flight-to"
          sx={{
            label: {
              color: theme.colors.gray[200],
              fontSize: '15px',
              fontWeight: 'normal'
            }
          }}
          itemComponent={SelectItem}
          label="To"
          placeholder="Pick location"
          data={originId ? createToData(flights, originId) : []}
          searchable
          nothingFound={
            originId ? 'No Flights Found' : 'Please select a departure location'
          }
          filter={(query, item) =>
            item.label?.toLowerCase().includes(query.toLowerCase().trim()) ||
            item.country.toLowerCase().includes(query.toLowerCase().trim()) ||
            item.city.toLowerCase().includes(query.toLowerCase().trim()) ||
            item.name.toLowerCase().includes(query.toLowerCase().trim())
          }
          clearable
          disabled={isOneWay}
        />
        <HStack spacing={5}>
          <DatePicker
            id="flight-departure-date"
            sx={{
              flexGrow: 1,
              label: {
                color: theme.colors.gray[200],
                fontSize: '15px',
                fontWeight: 'normal'
              }
            }}
            placeholder="Pick date"
            label="Depature Date"
            required
          />
          <DatePicker
            id="flight-return-date"
            sx={{
              flexGrow: 1,
              label: {
                color: theme.colors.gray[200],
                fontSize: '15px',
                fontWeight: 'normal'
              }
            }}
            placeholder="Pick date"
            label="Return Date"
          />
        </HStack>
        <Checkbox
          mt={4}
          color="gray.200"
          checked={isOneWay}
          onChange={() => setIsOneWay((prev) => !prev)}
        >
          One-Way-Flight
        </Checkbox>
      </GridItem>
      <GridItem area="stats"></GridItem>
      <GridItem area="button">
        <Button mt={10} type="submit" layerStyle={colorModeButton} w="100%">
          Search
        </Button>
      </GridItem>
    </Grid>
  );
};
