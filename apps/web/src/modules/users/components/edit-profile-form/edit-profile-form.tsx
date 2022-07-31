import {
  Flex,
  Grid,
  VStack,
  Box,
  Heading,
  StackProps,
  Divider,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BoxProps,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Text,
  Select,
  InputGroup,
  InputLeftAddon,
  useColorModeValue
} from '@chakra-ui/react';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { isValidNumberForRegion } from 'libphonenumber-js';
import { useRouter } from 'next/router';
import { CheckIcon } from '@chakra-ui/icons';
import { isEmpty, cloneDeep } from 'lodash';

import { type User, type Country } from '@common/types';
import { usersApiClient, editProfileSchema } from '@modules/users';
import { COUNTRIES } from '@common/constants';
import { useMutation } from '@tanstack/react-query';
import {
  Form,
  Input,
  PasswordInput,
  CountrySelect,
  ContactInput,
  ConfirmPassword,
  type FormProps
} from '@common/components';
import { sleep } from '@common/utils';
import { useAxiosInterceptor } from '@common/hooks';

type EditProfileFormData = {
  email: string;
  username: string;
  contact: string;
  password: string;
  confirmPassword: string;
};

export type EditProfileFormProps = Partial<FormProps> & {
  user?: User | null;
};

export function EditProfileForm({
  id,
  user,
  ...formProps
}: EditProfileFormProps) {
  const router = useRouter();
  const [mobileCode, setMobileCode] = useState<string>('');
  const { validationErrors } = useAxiosInterceptor<EditProfileFormData>({
    enableToast: true
  });
  const methods = useForm<EditProfileFormData>({
    resolver: yupResolver(editProfileSchema(mobileCode))
  });
  const {
    reset,
    formState: { isDirty }
  } = methods;
  const editMutation = useMutation(
    async ({ confirmPassword, ...rest }: EditProfileFormData) => {
      return usersApiClient.updateUserById(user?.userId, rest);
    },
    {
      onMutate: async (data) => {
        const resetData = cloneDeep(data);
        resetData.contact = data?.contact?.replace(/.+(?<=\s)/, '');
        reset(resetData);
      },
      onSuccess: async () => {
        await sleep(1000);
        router.reload();
      }
    }
  );

  const onSubmit = (editProfileFormData: EditProfileFormData) => {
    if (!isEmpty(editProfileFormData) && isDirty) {
      editMutation.mutate(editProfileFormData);
    }
  };

  useEffect(() => {
    if (user) {
      const userMobileCode = user.contact.split(' ')[0];
      setMobileCode(userMobileCode);
    }
  }, [user]);

  useEffect(() => {
    // if select field is touched, then set the contact value to user's current contact
    // this is to trigger yup validation
    if (user && mobileCode) {
      const userMobileCode = user.contact.split(' ')[0];
      const userNumber = user.contact.replace(userMobileCode, '').trim();
      if (mobileCode !== userMobileCode) {
        methods.setValue('contact', userNumber);
      }
    }
  }, [mobileCode]);

  return (
    <Form
      id={id}
      methods={methods}
      onSubmit={onSubmit}
      sx={{
        display: 'flex',
        flexDir: 'column',
        gap: 3
      }}
      {...formProps}
    >
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder={user?.email}
        errorRes={validationErrors?.email}
      />
      <Input
        name="username"
        type="text"
        label="Username"
        placeholder={user?.username}
        errorRes={validationErrors?.username}
      />

      <CountrySelect
        label="Country"
        useMobileCode
        value={mobileCode}
        setValue={setMobileCode}
      />
      <ContactInput
        name="contact"
        label="Contact"
        mobileCode={mobileCode}
        placeholder={user?.contact.match(/(?<=\s)\d+$/)?.[0]}
        errorRes={validationErrors?.contact}
      />
      <ConfirmPassword
        password={{
          name: 'password',
          label: 'Password',
          placeholder: '●●●●●●●●'
        }}
        confirmPassword={{
          name: 'confirmPassword',
          label: 'Confirm Password',
          placeholder: '●●●●●●●●'
        }}
      />
      <Button
        mt={5}
        type="submit"
        colorScheme="brandGold"
        isLoading={editMutation.isLoading}
        {...(editMutation.isSuccess && {
          colorScheme: 'green'
        })}
      >
        {editMutation.isSuccess ? <CheckIcon /> : 'Save Changes'}
      </Button>
    </Form>
  );
}
