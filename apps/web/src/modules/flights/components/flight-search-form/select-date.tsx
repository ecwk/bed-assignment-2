import {
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Text,
  useTheme,
  type StackProps
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { DatePicker } from '@mantine/dates';
import { useEffect } from 'react';
import { useFormContext, useWatch, useController } from 'react-hook-form';

import { type Flight } from '@common/types';
import { type FlightSearchFormData } from './flight-search-form';

type SelectDateProps = StackProps & {
  flights: Flight[];
  returnFlights: Flight[];
};

export const SelectDate = ({
  flights,
  returnFlights,
  ...stackProps
}: SelectDateProps) => {
  const theme = useTheme();
  const { control, setValue } = useFormContext<FlightSearchFormData>();
  const { from, to, isTwoWay, departureDate, returnDate } = useWatch({
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
    <HStack spacing={5} {...stackProps} alignItems="flex-start">
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
          Selected{' '}
          {
            flights?.filter((flight) =>
              dayjs(flight.departureDate).isSame(departureDate, 'day')
            ).length || 0
          }{' '}
          departure flights
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
          {isTwoWay
            ? `Selected ${
                returnFlights?.filter((flight) =>
                  dayjs(flight.departureDate).isSame(returnDate, 'date')
                ).length || 0
              } return flights`
            : '-'}
        </FormHelperText>
      </FormControl>
    </HStack>
  );
};
