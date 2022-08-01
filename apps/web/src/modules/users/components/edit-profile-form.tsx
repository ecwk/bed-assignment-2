import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Flex, VStack, Text } from '@chakra-ui/react';

import {
  Link,
  Form,
  Input,
  CountrySelect,
  ContactInput,
  ConfirmPassword,
  FormButton,
  ProfileAvatar,
  type FormProps
} from '@common/components';
import { sleep } from '@common/utils';
import { useAuth } from '@modules/auth';
import { usersApiClient, editProfileSchema } from '@modules/users';

type EditProfileFormData = {
  email: string;
  username: string;
  contact: string;
  password: string;
  confirmPassword: string;
};

export type EditProfileFormProps = Partial<FormProps> & {};

export function EditProfileForm({
  id,
  sx,
  ...formProps
}: EditProfileFormProps) {
  const [mobileCode, setMobileCode] = useState<string>('');
  const methods = useForm<EditProfileFormData>({
    resolver: yupResolver(editProfileSchema(mobileCode))
  });
  const { isLoading, user } = useAuth();
  const router = useRouter();

  const editMutation = useMutation(
    async ({ confirmPassword, ...rest }: EditProfileFormData) => {
      return usersApiClient.updateUserById(user?.userId, rest);
    },
    {
      onMutate: async () => {
        await sleep(2000);
      },
      onSuccess: () => {
        setTimeout(() => {
          router.reload();
        }, 1000);
      }
    }
  );

  const onSubmit = (data: EditProfileFormData) => {
    editMutation.mutate(data);
  };

  useEffect(() => {
    if (!isLoading && user) {
      setMobileCode(user.contact.split(' ')[0]);
    }
  }, [isLoading]);

  return (
    <Form
      onSubmit={onSubmit}
      methods={methods}
      sx={{
        display: 'flex',
        flexDir: 'column',
        gap: 3,
        ...sx
      }}
      {...formProps}
    >
      <Flex className="profile-details" alignItems="center" gap={4}>
        <ProfileAvatar user={user} size="xl" borderRadius="lg" />
        <VStack alignItems="flex-start" spacing={0}>
          <Text fontSize="xl" fontWeight="semibold">
            {user?.username}
          </Text>
          <Text color="gray.300">{user?.contact}</Text>
          <Link color="blue.200" href={`mailto:${user?.email}`}>
            {user?.email}
          </Link>
        </VStack>
      </Flex>
      <Input
        _placeholder={{
          fontSize: '10px'
        }}
        name="email"
        type="email"
        label="Email"
        placeholder={user?.email}
      />
      <Input
        name="username"
        type="username"
        label="Username"
        placeholder={user?.username}
      />
      <Flex sx={{ gap: 4 }}>
        <CountrySelect
          label="Country"
          value={mobileCode}
          setValue={setMobileCode}
          useMobileCode
        />
        <ContactInput
          name="contact"
          label="Contact"
          mobileCode={mobileCode}
          placeholder={user?.contact.split(' ')[1]}
        />
      </Flex>
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
      <FormButton
        mt={4}
        isLoading={editMutation.isLoading}
        isSuccess={editMutation.isSuccess}
        size="md"
      >
        Save Changes
      </FormButton>
    </Form>
  );
}
