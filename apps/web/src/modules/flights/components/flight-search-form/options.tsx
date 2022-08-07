import {
  Box,
  FormLabel,
  VStack,
  Checkbox,
  type BoxProps
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { type FlightSearchFormData } from './flight-search-form';

type FlightSearchFormProps = BoxProps & {};

export const Options = ({ ...boxProps }: FlightSearchFormProps) => {
  const { register } = useFormContext<FlightSearchFormData>();

  return (
    <Box {...boxProps}>
      <FormLabel fontSize="15px" fontWeight="normal">
        Options
      </FormLabel>
      <VStack alignItems="start" spacing={5}>
        <Checkbox {...register('isTwoWay')}>Two-Way Flight</Checkbox>
        <Checkbox {...register('isDirect')} defaultChecked isDisabled>
          Direct Flight
        </Checkbox>
      </VStack>
    </Box>
  );
};
