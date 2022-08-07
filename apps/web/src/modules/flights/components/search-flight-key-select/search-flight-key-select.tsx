import { useEffect } from 'react';
import { MultiSelect, type SelectItem } from '@mantine/core';

import { type Flight } from '@common/types';
import { useColorModeValue, useToken } from '@chakra-ui/react';

const SEARCH_KEYS: Record<
  | 'origin'
  | 'destination'
  | 'flightCode'
  | 'aircraftName'
  | 'originId'
  | 'destinationId',
  (keyof Flight)[]
> = {
  origin: ['originAirportName', 'originAirportCity', 'originAirportCountry'],
  destination: [
    'destinationAirportName',
    'destinationAirportCity',
    'destinationAirportCountry'
  ],
  originId: ['originAirportId'],
  destinationId: ['destinationAirportId'],
  flightCode: ['flightCode'],
  aircraftName: ['aircraftName']
};

type MultiSelectOptions = SelectItem & {
  value: keyof typeof SEARCH_KEYS;
};

const MULTI_SELECT_OPTIONS: MultiSelectOptions[] = [
  {
    value: 'origin',
    label: 'Origin'
  },
  {
    value: 'destination',
    label: 'Destination'
  },
  {
    value: 'originId',
    label: 'Origin ID'
  },
  {
    value: 'destinationId',
    label: 'Destination ID'
  },
  {
    value: 'flightCode',
    label: 'Flight Code'
  },
  {
    value: 'aircraftName',
    label: 'Aircraft'
  }
];

type SelectOptionValue = keyof typeof SEARCH_KEYS;

const DEFAULT_MULTI_SELECT_OPTIONS: (keyof typeof SEARCH_KEYS)[] = ['origin'];

type Props = {
  onChange: (keys: (keyof Flight)[]) => void;
};

export const SearchFlightKeySelect = ({ onChange }: Props) => {
  useEffect(() => {
    let keys: (keyof Flight)[] = [];
    DEFAULT_MULTI_SELECT_OPTIONS.forEach((v) => {
      keys = [...keys, ...SEARCH_KEYS[v]];
    });
    onChange(keys);
  }, []);

  const [borderColor, backgroundColor] = useToken('colors', [
    useColorModeValue('brandGray.200', 'brandGray.600'),
    useColorModeValue('brandGray.50', 'brandGray.700')
  ]);

  return (
    <MultiSelect
      id="search-flight-key-select"
      data={MULTI_SELECT_OPTIONS}
      defaultValue={DEFAULT_MULTI_SELECT_OPTIONS}
      size="sm"
      variant="headless"
      placeholder="No filters specified"
      nothingFound="None..."
      onChange={(value: SelectOptionValue[]) => {
        let keys: (keyof Flight)[] = [];
        value.forEach((v) => {
          keys = [...keys, ...SEARCH_KEYS[v]];
        });
        onChange(keys);
      }}
      styles={{
        dropdown: {
          backgroundColor: backgroundColor,
          borderColor: borderColor
        }
      }}
    />
  );
};
