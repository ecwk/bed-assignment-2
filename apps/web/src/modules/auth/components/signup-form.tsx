import {
  Flex,
  FlexProps,
  InputGroup,
  InputLeftElement,
  InputLeftAddon,
  Input,
  Button,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  useColorModeValue
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { parsePhoneNumberWithError, ParseError } from 'libphonenumber-js';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { isValidNumberForRegion } from 'libphonenumber-js';
import { AiOutlineCheck } from 'react-icons/ai';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@modules/auth';
import { COUNTRIES } from '@common/constants';
import { Country } from '@common/types';

type SignupFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  contact: string;
};

type SignupFormProps = FlexProps & {};

export const SignupForm = (props: FlexProps) => {
  const { signup } = useAuth();
  const router = useRouter();
  const [country, setCountry] = useState<Country>(
    () => COUNTRIES.find((country) => country.code === 'SG') as Country
  );
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema(country))
  });
  const toast = useToast();

  const signupMutation = useMutation(
    ({ confirmPassword, ...rest }: SignupFormData) => {
      return signup(rest);
    },
    {
      onError: (err) => {
        if (err instanceof AxiosError) {
          const status = err.response?.status as number;
          const data = err.response?.data;
          let title: string, description: string;
          if ([400, 422].includes(status) && data.error instanceof Array) {
            title = data.message;
            const errors = data.error;
            errors.forEach((err_: string) => {
              toast({
                title: title,
                description: err_,
                status: 'error',
                duration: 10000,
                isClosable: true,
                position: 'top'
              });
            });
          } else {
            title = data.error || data.message;
            description = data.error ? data.message : undefined;
            toast({
              title: title,
              description: description,
              status: 'error',
              duration: 10000,
              isClosable: true,
              position: 'top'
            });
          }
        } else {
          console.error(err);
        }
      },
      onSuccess: () => {
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      }
    }
  );
  const onSubmit = handleSubmit((signupFormData) =>
    signupMutation.mutate(signupFormData)
  );

  const colorModeButton = useColorModeValue(
    'lightModeButton',
    'darkModeButton'
  );

  return (
    <Flex as="form" flexDir="column" gap={5} onSubmit={onSubmit} {...props}>
      <FormControl isInvalid={!!errors.email}>
        <FormHelperText mt={0}>Email</FormHelperText>
        <InputGroup>
          <Input {...register('email')} type="email" placeholder="Email" />
        </InputGroup>
        {errors.email && (
          <FormErrorMessage>{errors.email.message}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={!!errors.username}>
        <FormHelperText mt={0}>Username</FormHelperText>
        <InputGroup>
          <Input {...register('username')} type="text" placeholder="Username" />
        </InputGroup>
        {errors.username && (
          <FormErrorMessage>{errors.username.message}</FormErrorMessage>
        )}
      </FormControl>
      <Flex gap={2}>
        <FormControl
          isInvalid={!!(errors.confirmPassword || errors.password)}
          transition="0.2s"
          flexBasis="0"
          flexGrow="1"
          _focusWithin={{
            flexGrow: 2
          }}
        >
          <FormHelperText mt={0}>Password</FormHelperText>
          <InputGroup>
            <Input
              {...register('password')}
              type="password"
              placeholder="Password"
            />
          </InputGroup>
          {(errors.confirmPassword || errors.password) && (
            <FormErrorMessage>
              {errors.confirmPassword?.message || errors.password?.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          isInvalid={!!(errors.confirmPassword || errors.password)}
          transition="0.2s"
          flexBasis="0"
          flexGrow="1"
          _focusWithin={{
            flexGrow: 2
          }}
        >
          <FormHelperText mt={0}>Confirm Password</FormHelperText>
          <InputGroup>
            <Input
              {...register('confirmPassword')}
              type="password"
              placeholder="Confirm Password"
            />
          </InputGroup>
        </FormControl>
      </Flex>
      <Flex gap={2}>
        <FormControl height="100%">
          <FormHelperText mt={0}>Country</FormHelperText>
          <Select
            defaultValue="SG"
            onChange={(e) => {
              setCountry(
                COUNTRIES.find(
                  (country) => country.code === e.target.value
                ) as Country
              );
            }}
          >
            {COUNTRIES.map((country) => (
              <option key={country.name} value={country.code}>
                {country.name} ({country.mobileCode})
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl isInvalid={!!errors.contact}>
          <FormHelperText mt={0}>Contact</FormHelperText>
          <InputGroup>
            <InputLeftAddon
              maxW="100px"
              color={useColorModeValue('gray.700', 'brandText')}
            >
              {country.mobileCode}
            </InputLeftAddon>
            <Input
              {...register('contact')}
              type="text"
              placeholder="Contact Number"
            />
          </InputGroup>
          {errors.contact && (
            <FormErrorMessage>{errors.contact.message}</FormErrorMessage>
          )}
        </FormControl>
      </Flex>
      <Button
        mt={4}
        type="submit"
        layerStyle={colorModeButton}
        size="lg"
        isLoading={signupMutation.isLoading}
        {...(signupMutation.isSuccess && {
          layerStyle: undefined,
          colorScheme: 'green'
        })}
      >
        {signupMutation.isSuccess ? <AiOutlineCheck /> : 'Sign Up'}
      </Button>
    </Flex>
  );
};

export const signupSchema = (country: Country) =>
  yup.object({
    username: yup.string().min(3).max(20).required(),
    email: yup.string().email().max(255).required(),
    contact: yup
      .string()
      .test(
        'isValidCountryContact',
        `Contact must be valid in ${country.name}`,
        (value) => {
          if (value) {
            return isValidNumberForRegion(value, country.code);
          }
          return true;
        }
      )
      .required()
      .transform((value) => {
        return `${country.mobileCode} ${value.replace(' ', '')}`;
      }),
    password: yup
      .string()
      .matches(/(?=.*[a-z]).*/, {
        message: 'Password must contain at least 1 lowercase letter'
      })
      .matches(/(?=.*[A-Z]).*/, {
        message: 'Password must contain at least 1 uppercase letter'
      })
      .matches(/(?=.*[0-9]).*/, {
        message: 'Password must contain at least 1 number'
      })
      .matches(/(?=.*[!@#$%^&*]).*/, {
        message: 'Password must contain at least 1 special character (!@#$%^&*)'
      })
      .test(
        'minimumLength',
        'Password must containt at least 8 characters',
        (value) => {
          if (value) {
            return value.length >= 8;
          } else {
            return true;
          }
        }
      )
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
  });
