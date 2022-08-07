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
  useToast,
  Select as ChakraSelect
} from '@chakra-ui/react';

import { sleep } from '@common/utils';
import {
  Form,
  Input,
  H3,
  FormButton,
  SelectMantine,
  Textarea,
  ConfirmPassword,
  CountrySelect,
  ContactInput,
  Select
} from '@common/components';
import { CreateUserDto, usersApiClient } from '@modules/users';
import { COUNTRIES } from '@common/constants';

export type CreateUserFormData = CreateUserDto;

export type CreateUserFormProps = {
  methods: UseFormReturn<CreateUserFormData>;
  onClose: () => void;
  mobileCode: string;
  setMobileCode: (code: string) => void;
};

export const CreateUserForm = ({
  methods,
  onClose,
  mobileCode,
  setMobileCode
}: CreateUserFormProps) => {
  const toast = useToast();

  const createMutation = useMutation(
    async (data: CreateUserFormData) => {
      return usersApiClient.createUser(data);
    },
    {
      onMutate: async () => {
        await sleep(random(500, 3000));
      },
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'User created successfully',
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
        }, 1000);
      }
    }
  );
  const onSubmit = async (data: CreateUserFormData) => {
    createMutation.mutate(data);
  };

  const clear = () => {
    methods.reset();
  };

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Input
        mt={4}
        name="email"
        type="text"
        label="Email"
        labelProps={labelProps}
        placeholder="Email"
      />
      <Input
        mt={4}
        name="username"
        type="username"
        label="Username"
        placeholder="Username"
        labelProps={labelProps}
      />
      <ConfirmPassword
        mt={4}
        password={{
          name: 'password',
          label: 'Password',
          labelProps: labelProps,
          placeholder: 'Password'
        }}
        confirmPassword={{
          name: 'confirmPassword',
          label: 'Confirm Password',
          labelProps: labelProps,
          placeholder: 'Confirm Password'
        }}
      />
      <Flex mt={4} gap={4}>
        <CountrySelect
          label="Country"
          labelProps={labelProps}
          value={mobileCode}
          setValue={setMobileCode}
          useMobileCode
        />
        <ContactInput
          name="contact"
          label="Contact"
          labelProps={labelProps}
          mobileCode={mobileCode}
          placeholder="Contact Number"
        />
      </Flex>
      <Select
        name="role"
        label="Role"
        data={[
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' }
        ]}
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
