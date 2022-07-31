import { Box, type BoxProps } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, FormProvider, type SubmitHandler } from 'react-hook-form';

export type FormProps = Omit<BoxProps, 'onSubmit'> & {
  methods: any;
  onSubmit?: SubmitHandler<any>;
  children?: React.ReactNode;
  schema?: any;
};

export function Form({
  methods,
  children,
  onSubmit,
  schema,
  ...boxProps
}: FormProps) {
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} {...boxProps}>
        {children}
      </Box>
    </FormProvider>
  );
}
