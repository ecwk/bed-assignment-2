import { random } from 'lodash';
import { useRouter } from 'next/router';
import { Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { AtSignIcon } from '@chakra-ui/icons';
import { useMutation } from '@tanstack/react-query';

import {
  Link,
  Form,
  Input,
  PasswordInput,
  FormButton,
  type FormProps
} from '@common/components';
import { sleep } from '@common/utils';
import { useAuth } from '@modules/auth';

type LoginFormData = {
  email: string;
  password: string;
};

type LoginFormProps = Partial<FormProps> & {};

export const LoginForm = ({ sx, ...formProps }: LoginFormProps) => {
  const methods = useForm<LoginFormData>();
  const { login, goBack, setGoBack } = useAuth();
  const router = useRouter();

  const loginMutation = useMutation(
    ({ email, password }: LoginFormData) => {
      return login(email, password);
    },
    {
      onMutate: async () => {
        await sleep(random(500, 3000));
      },
      onSuccess: () => {
        setTimeout(() => {
          if (goBack) {
            setGoBack(false);
            router.back();
          } else {
            router.push('/dashboard');
          }
        }, 1000);
      }
    }
  );

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <Form
      methods={methods}
      onSubmit={onSubmit}
      sx={{ display: 'flex', flexDir: 'column', gap: 5, ...sx }}
      {...formProps}
    >
      <Input
        inputProps={{
          size: 'lg'
        }}
        name="email"
        type="email"
        placeholder="Email"
        leftElement={<AtSignIcon color="brandGray.50" />}
      />
      <PasswordInput
        name="password"
        placeholder="Password"
        inputProps={{ size: 'lg' }}
        iconColor="brandGray.50"
      />
      <FormButton
        size="lg"
        isLoading={loginMutation.isLoading}
        isSuccess={loginMutation.isSuccess}
      >
        Login
      </FormButton>
      <Text textAlign="center" color="whiteAlpha.800">
        Don't have an account yet?{' '}
        <Link href="/signup" color="brandGold.300" underline>
          Sign Up
        </Link>
        .
      </Text>
    </Form>
  );
};
