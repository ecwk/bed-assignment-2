import { useEffect } from 'react';
import { random, isEmpty } from 'lodash';
import { useMutation } from '@tanstack/react-query';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HStack, useColorModeValue, useToast } from '@chakra-ui/react';

import { sleep } from '@common/utils';
import { SelectAirport } from './select-airport';
import { Form, Input, DatePicker, H3 } from '@common/components';
import { createFlightSchema, flightsApiClient } from '@modules/flights';

const DEFAULT_VALUES: Partial<CreateFlightFormData> = {
  // @ts-ignore
  departureDate: new Date()
};

export type CreateFlightFormData = {
  originAirportId: number;
  destinationAirportId: number;
  flightCode: string;
  aircraftName: string;
  price: number;
  departureDate: string;
  departureTime: string;
  hours: number;
  minutes: number;
};

export type CreateFlightFormProps = {
  previousFormState: Partial<CreateFlightFormData>;
  setPreviousFormState: (formState: Partial<CreateFlightFormData>) => void;
  onClose: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsSuccess: (isSuccess: boolean) => void;
};

export const CreateFlightForm = ({
  previousFormState,
  setPreviousFormState,
  onClose,
  setIsLoading,
  setIsSuccess
}: CreateFlightFormProps) => {
  const methods = useForm<CreateFlightFormData>({
    defaultValues: isEmpty(previousFormState)
      ? DEFAULT_VALUES
      : previousFormState,
    resolver: yupResolver(createFlightSchema)
  });
  const watch = useWatch<CreateFlightFormData>({ control: methods.control });
  const { originAirportId, destinationAirportId } = watch;

  const toast = useToast();
  const createMutation = useMutation(
    async (data: CreateFlightFormData) => {
      const { departureTime, hours, minutes, ...rest } = data;
      return flightsApiClient.createFlight({
        ...rest,
        travelTime: `${hours} hours ${minutes} mins`
      });
    },
    {
      onMutate: async () => {
        await sleep(random(500, 3000));
      },
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Flight created successfully',
          status: 'success',
          duration: 5000,
          position: 'bottom-right',
          isClosable: true,
          containerStyle: {
            marginRight: '40px',
            marginBottom: '20px'
          }
        });
        setTimeout(() => {
          onClose();
          setPreviousFormState(DEFAULT_VALUES);
        }, 1000);
      }
    }
  );

  const onSubmit = (data: CreateFlightFormData) => {
    createMutation.mutate(data);
  };

  useEffect(() => {
    setPreviousFormState(watch);
  }, [watch]);

  useEffect(() => {
    setIsLoading(createMutation.isLoading);
    setIsSuccess(createMutation.isSuccess);
  }, [createMutation.isLoading, createMutation.isSuccess]);

  const labelProps = {
    color: 'label-color',
    fontWeight: 'normal',
    mb: 1
  };

  return (
    <Form id="flight-create-form" methods={methods} onSubmit={onSubmit}>
      <H3>Airport</H3>
      <SelectAirport
        mt={4}
        queryKey="originAirportId"
        dataHook={(data) =>
          data.filter(
            ({ value }) => Number(value) !== Number(destinationAirportId)
          )
        }
        name="originAirportId"
        label="Origin Airport"
        labelProps={labelProps}
        placeholder="Select origin airport"
      />

      <SelectAirport
        mt={4}
        queryKey="destinationAirportId"
        dataHook={(data) =>
          data.filter(({ value }) => Number(value) !== Number(originAirportId))
        }
        name="destinationAirportId"
        label="Destination Airport"
        labelProps={labelProps}
        placeholder="Select destination airport"
      />

      <H3 mt={6}>Details</H3>
      <HStack mt={4} spacing={4} alignItems="flex-start">
        <Input
          name="flightCode"
          type="text"
          label="Flight Code"
          labelProps={labelProps}
          placeholder="SP0123"
        />
        <Input
          name="aircraftName"
          type="text"
          label="Aircraft Name"
          labelProps={labelProps}
          placeholder="Boeing 747"
        />
      </HStack>
      <Input
        mt={4}
        pr={2}
        w="50%"
        name="price"
        type="number"
        label="Price"
        labelProps={labelProps}
        placeholder="0-1,000,000"
        leftAddon={'SGD'}
        step={'0.01'}
      />
      <HStack mt={4} spacing={4} alignItems="flex-start">
        <DatePicker
          name="departureDate"
          label="Date"
          labelProps={labelProps}
          placeholder="Pick a Date"
          pickerProps={{
            minDate: new Date(),
            clearable: false
          }}
        />
        <Input
          name="departureTime"
          type="time"
          label="Time"
          labelProps={labelProps}
        />
      </HStack>
      <HStack mt={4} w="50%" spacing={4} pr={2} alignItems="flex-start">
        <Input
          name="hours"
          type="number"
          label="Travel Time"
          labelProps={labelProps}
          leftAddon="Hours"
          flex={0}
          flexGrow={2}
          transition="flex 0.2s"
          _focusWithin={{
            flexGrow: 3
          }}
          placeholder="0-24"
        />
        <Input
          name="minutes"
          type="number"
          label="&nbsp;"
          labelProps={labelProps}
          leftAddon="Mins"
          flex={0}
          flexGrow={2}
          transition="flex 0.2s"
          _focusWithin={{
            flexGrow: 3
          }}
          placeholder="0-60"
        />
      </HStack>
    </Form>
  );
};
