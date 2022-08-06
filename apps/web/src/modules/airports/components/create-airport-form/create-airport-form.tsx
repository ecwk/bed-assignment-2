import { useEffect } from 'react';
import { random, isEmpty } from 'lodash';
import { useMutation } from '@tanstack/react-query';
import { useForm, UseFormReturn, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Flex,
  HStack,
  Spacer,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';

import { sleep } from '@common/utils';
import {
  Form,
  Input,
  H3,
  FormButton,
  SelectMantine,
  Textarea
} from '@common/components';
import { CreateAirportDto, airportsApiClient } from '@modules/airports';
import { COUNTRIES } from '@common/constants';

export type CreateAirportFormData = CreateAirportDto;

export type CreateAirportFormProps = {
  methods: UseFormReturn<CreateAirportFormData>;
  onClose: () => void;
};

export const CreateAirportForm = ({
  methods,
  onClose
}: CreateAirportFormProps) => {
  const toast = useToast();

  const createMutation = useMutation(
    async (data: CreateAirportFormData) => {
      return airportsApiClient.createAirport(data);
    },
    {
      onMutate: async () => {
        await sleep(random(500, 3000));
      },
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Airport created successfully',
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
          // methods.reset();
        }, 1000);
      }
    }
  );
  const onSubmit = async (data: CreateAirportFormData) => {
    createMutation.mutate(data);
  };

  const clear = () => {
    methods.reset();
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <H3>Details</H3>
      <Input
        mt={4}
        name="name"
        type="text"
        label="Name"
        labelProps={labelProps}
        placeholder="Name"
      />

      <SelectMantine
        mt={4}
        name="country"
        label="Country"
        labelProps={labelProps}
        data={COUNTRIES.map(({ name }) => ({
          label: name,
          value: name
        }))}
        selectProps={{
          size: 'md',
          placeholder: 'Select a country',
          nothingFound: 'No countries found',
          searchable: true,
          clearable: true,
          autoComplete: 'none'
        }}
      />
      <Input
        mt={4}
        name="city"
        type="text"
        label="City"
        labelProps={labelProps}
        placeholder="City"
      />

      <Textarea
        mt={4}
        name="description"
        type="text"
        label="Description"
        labelProps={labelProps}
        placeholder="Enter a description"
      />
      <Flex mt={10}>
        <Button variant="ghost" onClick={clear}>
          Clear
        </Button>
        <Spacer />
        <Button mr={3} w="100px" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <FormButton
          w="100px"
          size="md"
          isLoading={createMutation.isLoading}
          isSuccess={createMutation.isSuccess}
        >
          Add
        </FormButton>
      </Flex>
    </Form>
  );
};

const labelProps = {
  color: 'label-color',
  fontWeight: 'normal',
  mb: 1
};
