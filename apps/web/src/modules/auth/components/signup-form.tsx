import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Flex, Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Link,
  Form,
  Input,
  CountrySelect,
  ContactInput,
  ConfirmPassword,
  FormButton,
  type FormProps
} from '@common/components';
import { sleep } from '@common/utils';
import { useAuth, signupSchema } from '@modules/auth';

type SignupFormData = {
  username: string;
  email: string;
  contact: string;
  password: string;
  confirmPassword: string;
};

type SignupFormProps = Partial<FormProps> & {};

export const SignupForm = ({ sx, ...formProps }: SignupFormProps) => {
  const [mobileCode, setMobileCode] = useState('+65');
  const methods = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema(mobileCode))
  });
  const { signup } = useAuth();
  const router = useRouter();

  const signupMutation = useMutation(
    async ({ confirmPassword, ...signupDto }: SignupFormData) => {
      return signup(signupDto);
    },
    {
      onMutate: async () => {
        await sleep(2000);
      },
      onSuccess: () => {
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      }
    }
  );

  const onSubmit = (data: SignupFormData) => {
    signupMutation.mutate(data);
  };

  const labelProps = {
    fontWeight: 'normal',
    mb: 1
  };

  return (
    <Form
      enableToast={true}
      methods={methods}
      onSubmit={onSubmit}
      sx={{ display: 'flex', flexDir: 'column', gap: 4, ...sx }}
      {...formProps}
    >
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="Email"
        labelProps={labelProps}
      />
      <Input
        name="username"
        type="username"
        label="Username"
        placeholder="Username"
        labelProps={labelProps}
      />
      <ConfirmPassword
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
      <Flex sx={{ gap: 4 }}>
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
      <FormButton
        size="lg"
        mt={4}
        isLoading={signupMutation.isLoading}
        isSuccess={signupMutation.isSuccess}
      >
        Sign Up
      </FormButton>
      <Text textAlign="center" color="whiteAlpha.800">
        Already created an account?{' '}
        <Link href="/login" color="brandGold.300">
          Login
        </Link>
        .
      </Text>
    </Form>
  );
};
