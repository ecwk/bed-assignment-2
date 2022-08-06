import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  type FormControlProps
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { WarningTwoIcon } from '@chakra-ui/icons';

import { useAxiosInterceptor } from '@common/hooks';

export type ControlProps = FormControlProps & {
  name: string;
  label?: string;
  labelProps?: FormLabelProps;
};

export const Control = ({
  name,
  label,
  labelProps,
  children,
  ...formControlProps
}: ControlProps) => {
  const { validationErrors } = useAxiosInterceptor();
  const {
    formState: { errors: formErrors, dirtyFields }
  } = useFormContext<Record<string, unknown>>();
  const formError = formErrors?.[name];
  const validationError = validationErrors?.[name];
  const isDirty = dirtyFields?.[name];

  return (
    <FormControl
      {...formControlProps}
      isInvalid={!!formError || (!isDirty && !!validationError)}
    >
      {label && <FormLabel {...labelProps}>{label}</FormLabel>}
      {children}
      {formError && (
        <FormErrorMessage>
          <WarningTwoIcon mr={2} />
          {formError?.message}
        </FormErrorMessage>
      )}
      {!isDirty && validationError && (
        <FormErrorMessage>
          <WarningTwoIcon mr={2} />
          {validationError}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
