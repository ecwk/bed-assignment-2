import {
  Flex,
  FlexProps,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { useAuth } from '@modules/auth';

type LoginFormData = {
  email: string;
  password: string;
};

type LoginFormProps = FlexProps & {};

export const LoginForm = (props: LoginFormProps) => {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<LoginFormData>();
  const toast = useToast();

  const loginMutation = useMutation(
    ({ email, password }: LoginFormData) => {
      return login(email, password);
    },
    {
      onError: (err) => {
        if (err instanceof AxiosError) {
          const status = err.response?.status;
          const data = err.response?.data;
          let title: string, description: string;

          if (status === 401) {
            title = 'Invalid credentials';
            description = 'Please check your email and password';
          } else {
            title = data.error || data.message;
            description = data.error ? data.message : undefined;
          }
          toast({
            title: title,
            description: description,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top'
          });
        }
      }
    }
  );
  const onSubmit = handleSubmit((loginFormData) => {
    console.log(loginFormData);
    loginMutation.mutate(loginFormData);
  });

  return (
    <Flex as="form" flexDir="column" gap={5} onSubmit={onSubmit} {...props}>
      <FormControl isInvalid={loginMutation.isError}>
        <InputGroup>
          <Input
            {...register('email')}
            type="email"
            placeholder="Email"
            size="lg"
          />
        </InputGroup>
      </FormControl>
      <FormControl isInvalid={loginMutation.isError}>
        <InputGroup>
          <Input
            {...register('password')}
            type="password"
            placeholder="Password"
            size="lg"
          />
        </InputGroup>
      </FormControl>
      <Button
        type="submit"
        colorScheme="brand"
        size="lg"
        isLoading={loginMutation.isLoading}
      >
        Login
      </Button>
    </Flex>
  );
};
