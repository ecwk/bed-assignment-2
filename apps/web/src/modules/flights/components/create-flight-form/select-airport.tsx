import {
  ComponentPropsWithoutRef,
  forwardRef,
  useEffect,
  useMemo,
  useState
} from 'react';
import { Box, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedValue } from '@mantine/hooks';

import { client } from '@config/axios';
import { Airport } from '@common/types';
import { SelectMantine, type SelectMantineProps } from '@common/components';

const LIMIT = 10;
const EXCLUDED_AIRPORT_FIELDS: (keyof Airport)[] = [
  'createdOn',
  'description',
  'lastModifiedOn'
];
const EXCLUDED_QUERY = EXCLUDED_AIRPORT_FIELDS.map(
  (field) => `exclude=${field}`
).join('&');

export type SelectAirportProps = SelectMantineProps & {
  queryKey?: string;
  dataHook?: (data: SelectItemData[]) => SelectItemData[];
  placeholder?: string;
};

export const SelectAirport = ({
  queryKey,
  dataHook,
  placeholder,
  ...selectMantineProps
}: SelectAirportProps) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebouncedValue(query, 1000);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query !== debouncedQuery) {
      setIsLoading(true);
    } else if (query === debouncedQuery) {
      setIsLoading(false);
    }
  }, [query, debouncedQuery]);

  const airportsQuery = useQuery(
    ['airports', queryKey, { debouncedQuery }],
    (ctx) =>
      client.get(
        `/airports?q=${debouncedQuery}&limit=${LIMIT}&${EXCLUDED_QUERY}`,
        {
          signal: ctx.signal
        }
      )
  );

  const selectData = useMemo<SelectItemData[]>(() => {
    const airports: Airport[] = airportsQuery.data?.data?.airports || [];
    return airports.map(({ airportId, name, country, city }) => ({
      value: String(airportId),
      label: name,
      country,
      city
    }));
  }, [airportsQuery.data?.data]);

  const selectFilter = (_: string, item: SelectItemData) => {
    if (isLoading) {
      return false;
    }
    return (
      item.label?.toLowerCase().includes(debouncedQuery.toLowerCase().trim()) ||
      item.city.toLowerCase().includes(debouncedQuery.toLowerCase().trim()) ||
      item.country.toLowerCase().includes(debouncedQuery.toLowerCase().trim())
    );
  };

  const { selectProps, ...rest } = selectMantineProps;

  return (
    <SelectMantine
      data={dataHook ? dataHook(selectData) : selectData}
      selectProps={{
        size: 'md',
        placeholder: placeholder || 'Select Airport',
        nothingFound: isLoading ? 'Loading...' : 'No airports found',
        filter: selectFilter,
        searchable: true,
        clearable: true,
        contentEditable: true,
        limit: LIMIT,
        icon: <SearchIcon />,
        itemComponent: SelectItem,
        maxDropdownHeight: 200,
        onInput: (e: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
        },
        ...selectProps
      }}
      {...rest}
    />
  );
};

interface SelectItemData extends ComponentPropsWithoutRef<'div'> {
  value: string;
  label: string;
  country: string;
  city: string;
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemData>(
  ({ label, country, city, ...rest }: SelectItemData, ref) => (
    <Box ref={ref} {...rest}>
      <Text fontSize="md">{label}</Text>
      <Text fontSize="sm" color="dimgray">
        {country}, {city}
      </Text>
    </Box>
  )
);
