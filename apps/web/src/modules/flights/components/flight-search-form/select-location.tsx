import {
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef
} from 'react';
import {
  Box,
  Text,
  Flex,
  useTheme,
  FormControl,
  FormHelperText,
  type FlexProps
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Select } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useFormContext, useWatch, useController } from 'react-hook-form';

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

  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 400);
  const [loading, setLoading] = useState(false);
  const [query2, setQuery2] = useState('');
  const [debouncedQuery2] = useDebouncedValue(query2, 400);
  const [loading2, setLoading2] = useState(false);

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

  useEffect(() => {
    if (query !== debouncedQuery) {
      setLoading(true);
    } else if (query === debouncedQuery) {
      setLoading(false);
    }
  }, [query, debouncedQuery]);

  useEffect(() => {
    if (query2 !== debouncedQuery2) {
      setLoading2(true);
    } else if (query2 === debouncedQuery2) {
      setLoading2(false);
    }
  }, [query2, debouncedQuery2]);

  const selectFilter = (query: string, item: typeof airportData[0]) => {
    if (loading) {
      return false;
    }
    return (
      item.label?.toLowerCase().includes(debouncedQuery.toLowerCase().trim()) ||
      item.city.toLowerCase().includes(debouncedQuery.toLowerCase().trim()) ||
      item.country.toLowerCase().includes(debouncedQuery.toLowerCase().trim())
    );
  };

  const selectFilter2 = (query: string, item: typeof airportData[0]) => {
    if (loading2) {
      return false;
    }
    return (
      item.label
        ?.toLowerCase()
        .includes(debouncedQuery2.toLowerCase().trim()) ||
      item.city.toLowerCase().includes(debouncedQuery2.toLowerCase().trim()) ||
      item.country.toLowerCase().includes(debouncedQuery2.toLowerCase().trim())
    );
  };

  useEffect;

  return (
    <Flex flexDir="column" {...flexProps}>
      <FormControl>
        <Select
          id="flight-from"
          label="From"
          placeholder="Where are you leaving from?"
          nothingFound={loading ? 'Loading...' : 'No Flights Found'}
          itemComponent={SelectItem}
          filter={selectFilter}
          data={airportData.filter((item) => item.value !== to)}
          searchable
          limit={10}
          clearable
          maxDropdownHeight={200}
          size="md"
          icon={<SearchIcon />}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
          }}
          styles={{
            input: {
              backgroundColor: theme.colors.whiteAlpha[50]
            },
            label: {
              color: theme.colors.gray[200],
              fontSize: '15px',
              fontWeight: 'normal'
            }
          }}
          {...registerFrom}
        />
      </FormControl>
      <FormControl>
        <Select
          id="flight-to"
          label="To"
          placeholder="Where would you like to go?"
          nothingFound={loading2 ? 'Loading...' : 'No Flights Found'}
          itemComponent={SelectItem}
          filter={selectFilter2}
          data={airportData.filter((item) => item.value !== from)}
          limit={10}
          searchable
          clearable
          maxDropdownHeight={200}
          size="md"
          icon={<SearchIcon />}
          onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery2(e.target.value);
          }}
          styles={{
            input: {
              backgroundColor: theme.colors.whiteAlpha[50]
            },
            label: {
              color: theme.colors.gray[200],
              fontSize: '15px',
              fontWeight: 'normal'
            }
          }}
          style={{
            marginTop: theme.space[5]
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
