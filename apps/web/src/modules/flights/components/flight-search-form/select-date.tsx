import dayjs from 'dayjs';
import { DatePicker } from '@mantine/dates';
import { HStack, useTheme, type StackProps } from '@chakra-ui/react';
import { useFormContext, useWatch, useController } from 'react-hook-form';

import { type FlightSearchFormData } from './flight-search-form';
import { useEffect } from 'react';

type SelectDateProps = StackProps & {};

export const SelectDate = ({ ...stackProps }: SelectDateProps) => {
  const theme = useTheme();
  const { control, setValue } = useFormContext<FlightSearchFormData>();
  const { isOneWay } = useWatch({ control });
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
    if (isOneWay) {
      setValue('returnDate', null);
    } else {
      setValue('returnDate', dayjs(new Date()).add(1, 'week').toDate());
    }
  }, [isOneWay]);

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
        maxDate={dayjs(new Date()).add(1, 'year').toDate()}
        inputFormat="YYYY/MM/DD"
        allowFreeInput
        clearable={false}
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
  );
};
