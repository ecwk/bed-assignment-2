import { useState, useEffect } from 'react';
import { useAxiosInterceptor } from '@common/hooks';
import { Box, type BoxProps } from '@chakra-ui/react';
import { useFormContext, type SubmitHandler } from 'react-hook-form';

import { FormProvider } from './form-provider';

export type FormProps = FormHandlerProps & {
  methods: any;
  enableToast?: boolean;
  children?: React.ReactNode;
};

export function Form({
  methods,
  enableToast,
  children,
  ...formHandlerProps
}: FormProps) {
  return (
    <FormProvider enableToast={enableToast} methods={methods}>
      <FormHandler {...formHandlerProps}>{children}</FormHandler>
    </FormProvider>
  );
}

type FormHandlerProps = Omit<BoxProps, 'onSubmit'> & {
  onSubmit: SubmitHandler<any>;
  children: React.ReactNode;
};

function FormHandler({ onSubmit, children, ...boxProps }: FormHandlerProps) {
  const {
    handleSubmit,
    reset,
    watch,
    formState: { dirtyFields, isDirty }
  } = useFormContext();
  const { clearErrors, validationErrors } = useAxiosInterceptor();

  // check if user updated all fields that received server validation error
  const [hasFixedErrors, setHasFixedErrors] = useState(false);

  useEffect(() => {
    const isEveryDirty = validationErrors
      ? Object.keys(validationErrors).every((key) => dirtyFields[key])
      : false;
    if (validationErrors && isEveryDirty) {
      setHasFixedErrors(true);
      clearErrors();
    } else if (!validationErrors) {
      setHasFixedErrors(true);
    } else {
      setHasFixedErrors(false);
    }
  }, [validationErrors, watch()]);

  const onSubmitWrapper = (data: any) => {
    if (hasFixedErrors && isDirty) {
      reset(data);
      onSubmit(data);
    }
  };
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmitWrapper)} {...boxProps}>
      {children}
    </Box>
  );
}
