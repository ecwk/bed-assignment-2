import {
  DatePicker as MantineDatePicker,
  DatePickerProps as MantineDatePickerProps
} from '@mantine/dates';
import { CalendarIcon } from '@chakra-ui/icons';
import { useController, useFormContext } from 'react-hook-form';
import { useColorModeValue, useTheme, useToken } from '@chakra-ui/react';

import { Control, type ControlProps } from '@common/components';

export type DatePickerProps = ControlProps & {
  placeholder?: string;
  icon?: React.ReactNode;
  pickerProps?: MantineDatePickerProps;
};

export const DatePicker = ({
  placeholder,
  icon = <CalendarIcon />,
  pickerProps,
  ...controlProps
}: DatePickerProps) => {
  const { control } = useFormContext<Record<string, any>>();
  const { field } = useController({
    control,
    name: controlProps.name
  });

  const [borderColor, borderColorHover, borderColorFocus, backgroundColor] =
    useToken('colors', [
      useColorModeValue('brandGray.200', 'brandGray.600'),
      useColorModeValue('gray.300', 'whiteAlpha.400'),
      useColorModeValue('brandGold.500', 'brandGold.200'),
      useColorModeValue('brandGray.50', 'brandGray.700')
    ]);
  const theme = useTheme();

  return (
    <Control {...controlProps}>
      <MantineDatePicker
        zIndex={theme.zIndices.modal}
        placeholder={placeholder}
        icon={icon}
        variant="default"
        size="md"
        style={{
          width: '100%'
        }}
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
              borderColor: borderColorFocus
            }
          },
          dropdown: {
            backgroundColor: backgroundColor,
            borderColor: borderColor
          },
          arrow: {
            backgroundColor: backgroundColor,
            borderColor: borderColor
          }
        }}
        {...field}
        {...pickerProps}
      />
    </Control>
  );
};
