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
  FormHelperText,
  useColorModeValue
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { BsLockFill } from 'react-icons/bs';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';
import { sleep } from '@common/utils';

import { useAuth } from '@modules/auth';
import { useRouter } from 'next/router';

type LoginFormData = {
  email: string;
  password: string;
};

type LoginFormProps = FlexProps & {};

export const LoginForm = (props: LoginFormProps) => {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<LoginFormData>();
  const toast = useToast();
  const router = useRouter();

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
            title = 'Invalid Credentials';
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
        } else {
          // log to server
          // ...
          console.error(err);
          toast({
            title: 'An Error Occurred',
            description: `This error has been reported. Try again later.`,
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
    loginMutation.mutate(loginFormData);
  });

  const colorModeButton = useColorModeValue(
    'lightModeButton',
    'darkModeButton'
  );

  return (
    <Flex as="form" flexDir="column" gap={5} onSubmit={onSubmit} {...props}>
      <FormControl isInvalid={loginMutation.isError}>
        <InputGroup size="lg">
          <InputLeftElement>
            <MdOutlineAlternateEmail />
          </InputLeftElement>
          <Input {...register('email')} type="email" placeholder="Email" />
        </InputGroup>
      </FormControl>
      <FormControl isInvalid={loginMutation.isError}>
        <InputGroup size="lg">
          <InputLeftElement>
            <BsLockFill />
          </InputLeftElement>
          <Input
            {...register('password')}
            type="password"
            placeholder="Password"
          />
        </InputGroup>
      </FormControl>
      <Button
        type="submit"
        layerStyle={colorModeButton}
        size="lg"
        isLoading={loginMutation.isLoading}
        {...(loginMutation.isSuccess && {
          layerStyle: undefined,
          colorScheme: 'green'
        })}
      >
        {loginMutation.isSuccess ? <AiOutlineCheck /> : 'Login'}
      </Button>
    </Flex>
  );
};
