import {
  Flex,
  HStack,
  Text,
  FormControl,
  FormHelperText,
  useTheme,
  type StackProps
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { DatePicker } from '@mantine/dates';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useFormContext, useWatch, useController } from 'react-hook-form';

import { client } from '@config/axios';
import { type Flight } from '@common/types';
import { type FlightSearchFormData } from './flight-search-form';

type SelectDateProps = StackProps & {};

export const SelectDate = ({ ...stackProps }: SelectDateProps) => {
  const theme = useTheme();
  const { control, setValue } = useFormContext<FlightSearchFormData>();
  const { from, to, isTwoWay } = useWatch({
    control
  });
  const { field: registerDepartureDate } = useController({
    control,
    name: 'departureDate'
  });
  const { field: registerReturnDate } = useController({
    control,
    name: 'returnDate'
  });

  const { data: dataFlights } = useQuery(
    [
      'flights',
      {
        from: from,
        to: to
      }
    ],
    (ctx) => {
      return client.get(`/flights/direct/${from}/${to}?dateFilterType=none`, {
        signal: ctx.signal
      });
    },
    {
      enabled: !!from && !!to // fetch only when location set
    }
  );
  const { data: dataReturnFlights } = useQuery(
    [
      'returnFlights',
      {
        to,
        from
      }
    ],
    (ctx) => {
      return client.get(`/flights/direct/${to}/${from}?dateFilterType=none`, {
        signal: ctx.signal
      });
    },
    {
      enabled: !!from && !!to && !!isTwoWay
    }
  );

  const flights: Flight[] = dataFlights?.data?.flights;
  const returnFlights: Flight[] = dataReturnFlights?.data?.flights;

  // TODO: performance issue
  /* 
    instead of looping through flights for every day,
    just loop through flights once and store the flight number in an array
  */

  useEffect(() => {
    if (!isTwoWay) {
      setValue('returnDate', null);
    }
  }, [isTwoWay]);

  const renderDay = (flights: Flight[]) => (date: Date) => {
    const day = date.getDate();
    let numberOfFlights = 0;
    flights?.forEach(({ departureDate }) => {
      if (dayjs(departureDate).isSame(date, 'day')) {
        numberOfFlights++;
      }
    });

    return (
      <Flex flexDir="column" textAlign="center">
        <Text
          mt="-4px"
          color={date.getDay() === 5 && date.getDate() === 13 ? '' : ''}
        >
          {day}
        </Text>
        {dayjs(date).isAfter(dayjs().subtract(1, 'day')) &&
          dayjs(date).isBefore(dayjs().add(1, 'year')) && (
            <Text
              mt="-20px"
              fontSize="xx-small"
              color={numberOfFlights === 0 ? 'gray.400' : 'brandGold.300'}
              fontWeight="bold"
            >
              {numberOfFlights === 0 ? '-' : numberOfFlights}
            </Text>
          )}
      </Flex>
    );
  };

  return (
    <HStack spacing={5} {...stackProps}>
      <FormControl>
        <DatePicker
          id="flight-departure-date"
          placeholder="Pick date"
          label="Depature Date"
          required
          inputFormat="YYYY/MM/DD"
          clearable={false}
          disabled={!from || !to}
          dropdownPosition="top"
          defaultValue={new Date()}
          minDate={new Date()}
          maxDate={dayjs(new Date()).add(1, 'year').toDate()}
          renderDay={renderDay(flights)}
          styles={(theme) => ({
            day: {
              height: '45px'
            }
          })}
          sx={{
            flexGrow: 1,
            label: {
              color: theme.colors.gray[200],
              fontSize: '15px',
              fontWeight: 'normal'
            }
          }}
          {...registerDepartureDate}
        />
        <FormHelperText>
          Found {flights?.length || '0'} flight
          {flights?.length === 1 ? '' : 's'}
        </FormHelperText>
      </FormControl>
      <FormControl>
        <DatePicker
          id="flight-return-date"
          placeholder={isTwoWay ? 'Pick Return Date' : 'Disabled'}
          label="Return Date"
          required
          inputFormat="YYYY/MM/DD"
          clearable={false}
          disabled={!isTwoWay || !from || !to}
          dropdownPosition="top"
          minDate={new Date()}
          maxDate={dayjs(new Date()).add(1, 'year').toDate()}
          renderDay={renderDay(returnFlights)}
          styles={(theme) => ({
            day: {
              height: '45px'
            }
          })}
          sx={{
            flexGrow: 1,
            label: {
              color: theme.colors.gray[200],
              fontSize: '15px',
              fontWeight: 'normal'
            }
          }}
          {...registerReturnDate}
        />
        <FormHelperText>
          Found {returnFlights?.length || '0'} flight
          {returnFlights?.length === 1 ? '' : 's'}
        </FormHelperText>
      </FormControl>
    </HStack>
  );
};
