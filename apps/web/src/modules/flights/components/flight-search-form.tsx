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
  Text,
  FormControl,
  FormLabel
} from '@chakra-ui/react';
import { Select } from '@mantine/core';
import { useRouter } from 'next/router';
import { DatePicker } from '@mantine/dates';
import {
  FormEventHandler,
  forwardRef,
  useEffect,
  useState,
  type ComponentPropsWithoutRef
} from 'react';

import { type Airport } from '@common/types';
import { createFromData, createToData } from '../utils';
import { Controller, useForm, useWatch, useController } from 'react-hook-form';
import dayjs from 'dayjs';
import { TypeOf } from 'yup';

interface ItemProps extends ComponentPropsWithoutRef<'div'> {
  label: string;
  country: string;
  city: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, country, city, ...rest }: ItemProps, ref) => (
    <Box ref={ref} {...rest}>
      <Text fontSize="md">
        {country}, {city}
      </Text>
      <Text fontSize="sm" color="dimgray">
        {label}
      </Text>
    </Box>
  )
);

type FlightSearchFormData = {
  from: string;
  to: string;
  departureDate: Date;
  isOneWay: boolean;
  isDirect: boolean;
  returnDate?: Date | null;
};

type FlightSearchFormProps = {
  airports: Airport[];
};

export const FlightSearchForm = ({ airports }: FlightSearchFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isOneWay, setIsOneWay] = useState<boolean>(true);
  const theme = useTheme();
  const router = useRouter();

  const colorModeButton = useColorModeValue(
    'lightModeButton',
    'darkModeButton'
  );

  const { handleSubmit, control, setValue, register } =
    useForm<FlightSearchFormData>();
  const { from, to, isOneWay } = useWatch({ control });
  const { field: registerFrom } = useController({ control, name: 'from' });
  const { field: registerTo } = useController({ control, name: 'to' });
  const { field: registerDepatureDate } = useController({
    control,
    name: 'departureDate',
    defaultValue: new Date()
  });
  const { field: registerReturnDate } = useController({
    control,
    name: 'returnDate'
  });

  const airportData = airports.map(({ airportId, name, country, city }) => ({
    value: String(airportId),
    label: name,
    country,
    city
  }));

  useEffect(() => {
    setValue(
      'returnDate',
      isOneWay ? null : dayjs(new Date()).add(1, 'week').toDate()
    );
  }, [isOneWay]);

  const onSubmit = handleSubmit(
    ({ from, to, departureDate, returnDate, isOneWay, isDirect }) => {
      let url = '/flights/search?';
      url += `from=${from}&`;
      url += `to=${to}&`;
      url += `departureDate=${departureDate.toISOString()}&`;
      url += `returnDate=${returnDate}&`;
      url += `isDirect=${isDirect}`;
      router.push(url);
    }
  );

  const selectFilter = (query: string, item: typeof airportData[0]) =>
    item.label?.toLowerCase().includes(query.toLowerCase().trim()) ||
    item.city.toLowerCase().includes(query.toLowerCase().trim()) ||
    item.country.toLowerCase().includes(query.toLowerCase().trim());

  return (
    <Grid
      as="form"
      gridTemplateAreas={`
          "heading heading"
          "form options"
          "button button"
        `}
      columnGap={5}
      onSubmit={onSubmit}
    >
      <GridItem area="heading" mt={5} mb={10}>
        <Heading w="100%">Book A Flight</Heading>
      </GridItem>
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
          data={airportData.filter((item) => item.value !== to)}
          searchable
          nothingFound="No Flights Found"
          filter={selectFilter}
          clearable
          {...registerFrom}
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
          data={airportData.filter((item) => item.value !== from)}
          searchable
          filter={selectFilter}
          clearable
          {...registerTo}
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
            minDate={new Date()}
            maxDate={dayjs(new Date()).add(1, 'year').toDate()}
            inputFormat="YYYY/MM/DD"
            allowFreeInput
            clearable={false}
            {...registerDepatureDate}
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
            disabled={isOneWay}
            minDate={new Date()}
            maxDate={dayjs(new Date()).add(1, 'year').toDate()}
            inputFormat="YYYY/MM/DD"
            allowFreeInput
            required
            clearable={false}
            {...registerReturnDate}
          />
        </HStack>
      </GridItem>
      <GridItem area="options">
        <FormControl>
          <FormLabel color="gray.200" fontSize="15px" fontWeight="normal">
            Options
          </FormLabel>
          <VStack alignItems="start" spacing={5}>
            <Checkbox {...register('isOneWay')} color="gray.200" defaultChecked>
              One-Way Flight
            </Checkbox>
            <Checkbox {...register('isDirect')} color="gray.200" defaultChecked>
              Direct Flight
            </Checkbox>
          </VStack>
        </FormControl>
      </GridItem>
      <GridItem area="button">
        <Button mt={16} type="submit" layerStyle={colorModeButton} w="100%">
          Search
        </Button>
      </GridItem>
    </Grid>
  );
};
