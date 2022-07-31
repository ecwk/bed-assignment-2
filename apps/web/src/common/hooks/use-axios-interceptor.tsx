import * as yup from 'yup';
import { AxiosError } from 'axios';
import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect
} from 'react';
import { useToast } from '@chakra-ui/react';

import { type ErrorResponse } from '@common/types';
import { client } from '@config/axios';
import { type FieldValues } from '@common/types';

interface ContextProps<TFieldValues extends FieldValues = FieldValues> {
  error: ErrorResponse<TFieldValues> | null;
  validationErrors: TFieldValues | null;
  clearErrors: () => void;
}

const AxiosInterceptorContext = createContext<ContextProps>({} as ContextProps);

type ProviderProps = {
  children?: ReactNode;
  enableToast?: boolean;
};

export const useAxiosInterceptorProvider = <
  TFieldValues extends FieldValues = FieldValues
>({
  enableToast = false
}: ProviderProps): ContextProps<TFieldValues> => {
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
    if (enableToast) {
      if (validationErrors && error) {
        Object.entries(validationErrors).forEach(([key, value]) => {
          toast({
            title: error.message,
            description: value,
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top'
          });
        });
      } else if (error?.statusCode === 401) {
        toast({
          title: error.message,
          description: error.error,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
      } else if (error) {
        toast({
          title: error.message,
          description:
            'This incident has been reported, please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top'
        });
      }
    }
  }, [validationErrors, error]);

  return { error, validationErrors, clearErrors };
};

export const AxiosInterceptorProvider = ({
  enableToast,
  children
}: ProviderProps) => {
  const context = useAxiosInterceptorProvider({ enableToast });

  return (
    <AxiosInterceptorContext.Provider value={context}>
      {children}
    </AxiosInterceptorContext.Provider>
  );
};

export const useAxiosInterceptor = <
  TFieldValues extends FieldValues = FieldValues
>(): ContextProps<TFieldValues> => {
  const context = useContext(
    AxiosInterceptorContext
  ) as ContextProps<TFieldValues>;

  return context;
};
