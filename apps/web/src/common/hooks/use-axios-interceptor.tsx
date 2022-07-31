import * as yup from 'yup';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

import { type ErrorResponse } from '@common/types';
import { client } from '@config/axios';
import { type FieldValues } from '@common/types';

type UseAxiosInterceptorProps = {
  enableToast?: boolean;
};

const defaultProps: UseAxiosInterceptorProps = {
  enableToast: false
};

export function useAxiosInterceptor<
  TFieldValues extends FieldValues = FieldValues
>({ enableToast }: UseAxiosInterceptorProps = defaultProps) {
  const toast = useToast();
  const [error, setError] = useState<ErrorResponse<TFieldValues> | null>(null);
  const [validationErrors, setValidationErrors] = useState<TFieldValues | null>(
    null
  );

  function clearErrors() {
    setError(null);
    setValidationErrors(null);
  }

  useEffect(() => {
    const id1 = client.interceptors.request.use((config) => {
      clearErrors();
      return config;
    });
    const id2 = client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error instanceof AxiosError) {
          const data = error.response?.data as ErrorResponse<TFieldValues>;
          if (data?.errors) {
            setValidationErrors(data?.errors);
          }
          setError(data);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      client.interceptors.response.eject(id1);
      client.interceptors.response.eject(id2);
    };
  }, []);

  useEffect(() => {
    if (enableToast && validationErrors && error) {
      Object.entries(validationErrors).forEach(([key, value]) => {
        toast({
          title: error.message,
          description: value,
          status: 'error',
          duration: 10000,
          isClosable: true,
          position: 'top'
        });
      });
    } else if (enableToast && error) {
      toast({
        title: error.message,
        description: 'This incident has been reported, please try again later.',
        status: 'error',
        duration: 10000,
        isClosable: true,
        position: 'top'
      });
    }
  }, [validationErrors, error]);

  return { error, validationErrors, clearErrors };
}
