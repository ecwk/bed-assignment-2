import dayjs from 'dayjs';
import { DatePicker } from '@mantine/dates';
import {
  Box,
  Flex,
  HStack,
  useTheme,
  Text,
  type StackProps
} from '@chakra-ui/react';
import { useFormContext, useWatch, useController } from 'react-hook-form';

import { useEffect, useState } from 'react';
import { type FlightSearchFormData } from './flight-search-form';

type SelectDateProps = StackProps & {};

export const SelectDate = ({ ...stackProps }: SelectDateProps) => {
  const [departureMaxDate, setDepartureMaxDate] = useState<Date | undefined>(
    undefined
  );
  const [returnMinDate, setReturnMinDate] = useState<Date | undefined>(
    undefined
  );
  const theme = useTheme();
  const { control, setValue } = useFormContext<FlightSearchFormData>();
  const { departureDate, returnDate, from, to, isTwoWay } = useWatch({
    control
  });
  const { field: registerDepartureDate } = useController({
    control,
    name: 'departureDate',
    defaultValue: new Date()
  });
  const { field: registerReturnDate } = useController({
    control,
    name: 'returnDate'
  });

  useEffect(() => {
    if (!isTwoWay) {
      setValue('returnDate', null);
    }
  }, [isTwoWay]);

  useEffect(() => {
    if (returnDate) {
      const clone = dayjs(new Date(returnDate));
      if (clone.isValid()) {
        setDepartureMaxDate(clone.subtract(1, 'day').toDate());
      }
    } else {
      setDepartureMaxDate(dayjs(new Date()).add(1, 'year').toDate());
    }
  }, [returnDate]);
  useEffect(() => {
    if (departureDate) {
      const clone = dayjs(new Date(departureDate));
      if (clone.isValid()) {
        setReturnMinDate(() => dayjs(clone).add(1, 'day').toDate());
      }
    } else {
      setReturnMinDate(new Date());
    }
  }, [departureDate]);

  return (
    <HStack spacing={5} {...stackProps}>
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
        maxDate={departureMaxDate}
        inputFormat="YYYY/MM/DD"
        allowFreeInput
        clearable={false}
        disabled={!from || !to}
        renderDay={RenderDay}
        styles={(theme) => ({
          dropdown: {
            width: '374px'
          },
          day: {
            width: '50px',
            height: '70px'
          }
        })}
        closeCalendarOnChange={false}
        {...registerDepartureDate}
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
        minDate={returnMinDate}
        maxDate={dayjs(new Date()).add(1, 'year').toDate()}
        inputFormat="YYYY/MM/DD"
        allowFreeInput
        required
        clearable={false}
        disabled={!from || !to || !isTwoWay}
        {...registerReturnDate}
      />
    </HStack>
  );
};

const RenderDay = (date: Date) => {
  const { control, setValue } = useFormContext<FlightSearchFormData>();
  const { departureDate, returnDate, from, to, isTwoWay } = useWatch({
    control
  });

  const day = date.getDate();
  return (
    <Flex flexDir="column" textAlign="start" pl="10px">
      <Text mt="-2px">{day}</Text>
      <Text mt="-20px" fontSize="xx-small" color="gray.400">
        0
      </Text>
      <Text mt="-26px" fontSize="xx-small" color="gray.400">
        Flights
      </Text>
    </Flex>
  );
};
