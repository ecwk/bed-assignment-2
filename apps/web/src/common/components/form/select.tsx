import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Select as ChakraSelect,
  type FormControlProps,
  type InputGroupProps
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { useAxiosInterceptor } from '@common/hooks';
import { useEffect } from 'react';

export type SelectProps = FormControlProps & {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  inputProps?: InputGroupProps;
  leftElement?: React.ReactNode;
  labelGap?: number | string;
  data?: SelectOption[];
};

export type SelectOption = {
  label: string;
  value: any;
};

export function Select({
  name,
  label,
  type,
  placeholder,
  defaultValue,
  inputProps,
  leftElement,
  labelGap,
  data,
  ...formControlProps
}: SelectProps) {
  const { error: errorRes, validationErrors } = useAxiosInterceptor();
  const {
    register,
    setValue,
    resetField,
    formState: { errors, dirtyFields }
  } = useFormContext<Record<string, unknown>>();
  const error = errors[name];
  const validationError = validationErrors?.[name];
  const isDirty = dirtyFields?.[name];

  const labelColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <FormControl
      isInvalid={
        !!error ||
        (!isDirty && !!validationError) ||
        (!isDirty && errorRes?.statusCode === 401)
      }
      {...formControlProps}
    >
      {label && (
        <FormLabel color={labelColor} mb={labelGap} fontWeight="normal">
          {label}
        </FormLabel>
      )}
      <ChakraSelect
        {...register(name)}
        placeholder={placeholder}
        defaultValue={defaultValue}
      >
        {data?.map(({ label, value }, i) => (
          <option value={value} key={`select-option-${label}-${value}-${i}`}>
            {label}
          </option>
        ))}
      </ChakraSelect>
    </FormControl>
  );
}
