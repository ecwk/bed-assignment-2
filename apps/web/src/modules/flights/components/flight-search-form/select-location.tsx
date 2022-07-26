import { Select } from '@mantine/core';
import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { useFormContext, useWatch, useController } from 'react-hook-form';
import {
  Box,
  Text,
  Flex,
  useTheme,
  type FlexProps,
  FormControl,
  FormHelperText
} from '@chakra-ui/react';

import { type Flight, type Airport } from '@common/types';
import { type FlightSearchFormData } from './flight-search-form';

type SelectLocationProps = FlexProps & {
  airports: Airport[];
  flights: Flight[];
  returnFlights: Flight[];
};

export const SelectLocation = ({
  airports,
  flights,
  returnFlights,
  ...flexProps
}: SelectLocationProps) => {
  const theme = useTheme();
  const { control } = useFormContext<FlightSearchFormData>();
  const { from, to, isTwoWay } = useWatch({ control });
  const { field: registerFrom } = useController({ control, name: 'from' });
  const { field: registerTo } = useController({ control, name: 'to' });

  const airportData = airports.map(({ airportId, name, country, city }) => ({
    value: String(airportId),
    label: name,
    country,
    city
  }));

  const selectFilter = (query: string, item: typeof airportData[0]) =>
    item.label?.toLowerCase().includes(query.toLowerCase().trim()) ||
    item.city.toLowerCase().includes(query.toLowerCase().trim()) ||
    item.country.toLowerCase().includes(query.toLowerCase().trim());

  return (
    <Flex flexDir="column" {...flexProps} gap={2}>
      <Select
        id="flight-from"
        label="From"
        placeholder="Pick location"
        nothingFound="No Flights Found"
        itemComponent={SelectItem}
        filter={selectFilter}
        data={airportData.filter((item) => item.value !== to)}
        searchable
        clearable
        required
        maxDropdownHeight={200}
        sx={{
          label: {
            color: theme.colors.gray[200],
            fontSize: '15px',
            fontWeight: 'normal'
          }
        }}
        {...registerFrom}
      />
      <FormControl>
        <Select
          id="flight-to"
          label="To"
          placeholder="Pick location"
          nothingFound="No Flights Found"
          itemComponent={SelectItem}
          filter={selectFilter}
          data={airportData.filter((item) => item.value !== from)}
          searchable
          clearable
          required
          maxDropdownHeight={200}
          sx={{
            label: {
              color: theme.colors.gray[200],
              fontSize: '15px',
              fontWeight: 'normal'
            }
          }}
          {...registerTo}
        />
        <FormHelperText>
          Found {flights?.length || '0'} departure
          {isTwoWay ? ` and ${returnFlights?.length || '0'} return ` : ' '}
          flights
        </FormHelperText>
      </FormControl>
    </Flex>
  );
};

interface ItemProps extends ComponentPropsWithoutRef<'div'> {
  label: string;
  country: string;
  city: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, country, city, ...rest }: ItemProps, ref) => (
    <Box ref={ref} {...rest}>
      <Text fontSize="md">{label}</Text>
      <Text fontSize="sm" color="dimgray">
        {country}, {city}
      </Text>
    </Box>
  )
);
