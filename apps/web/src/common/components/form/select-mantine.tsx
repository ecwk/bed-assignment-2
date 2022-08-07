import { Select, SelectItem, type SelectProps } from '@mantine/core';
import { Control, type ControlProps } from '@common/components';
import { useController, useFormContext } from 'react-hook-form';
import { useColorModeValue, useTheme, useToken } from '@chakra-ui/react';
import { useAxiosInterceptor } from '@common/hooks';

export type SelectMantineProps = ControlProps & {
  data?: SelectItem[];
  selectProps?: Omit<SelectProps, 'data'>;
};

export const SelectMantine = ({
  data = [],
  selectProps,
  ...controlProps
}: SelectMantineProps) => {
  const { validationErrors } = useAxiosInterceptor();
  const {
    control,
    formState: { errors: formErrors, dirtyFields }
  } = useFormContext<Record<string, any>>();
  const { field } = useController({
    control,
    name: controlProps.name
  });
  const { name } = controlProps;
  const formError = formErrors?.[name];
  const validationError = validationErrors?.[name];
  const isDirty = dirtyFields?.[name];

  const [
    borderColor,
    borderColorHover,
    borderColorFocus,
    backgroundColor,
    errorColor
  ] = useToken('colors', [
    useColorModeValue('brandGray.200', 'brandGray.600'),
    useColorModeValue('gray.300', 'whiteAlpha.400'),
    useColorModeValue('brandGold.500', 'brandGold.200'),
    useColorModeValue('brandGray.50', 'brandGray.800'),
    useColorModeValue('red.300', 'red.300')
  ]);
  const theme = useTheme();

  return (
    <Control {...controlProps}>
      <Select
        error={!!formError || (!isDirty && !!validationError)}
        data={data}
        zIndex={theme.zIndices.modal}
        styles={{
          input: {
            backgroundColor: 'transparent',
            borderRadius: theme.radii.md,
            borderColor: borderColor,
            transitionProperty: theme.transition.property.common,
            transitionDuration: theme.transition.duration.normal,
            ':hover': {
              borderColor: borderColorHover
            },
            ':focus': {
              boxShadow: `0 0 0 1px ${borderColorFocus}`,
              borderColor: `${borderColorFocus} !important`
            }
          },
          dropdown: {
            backgroundColor: backgroundColor,
            borderColor: borderColor
          },
          invalid: {
            '::placeholder': {
              color: errorColor
            },
            borderColor: errorColor,
            boxShadow: `0 0 0 1px ${errorColor}`
          }
        }}
        {...field}
        {...selectProps}
      />
    </Control>
  );
};
