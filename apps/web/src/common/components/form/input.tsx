import { useFormContext } from 'react-hook-form';
import { type HTMLInputTypeAttribute } from 'react';
import {
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputLeftAddon,
  useColorModeValue,
  type InputGroupProps
} from '@chakra-ui/react';

import { Control, type ControlProps } from '@common/components';

export type InputProps = ControlProps & {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string;
  leftElement?: React.ReactNode;
  leftAddon?: React.ReactNode;
  inputProps?: InputGroupProps;
  step?: string | number;
};

export function Input({
  type,
  placeholder,
  defaultValue,
  leftElement,
  leftAddon,
  inputProps,
  step,
  ...controlProps
}: InputProps) {
  const { register } = useFormContext<Record<string, any>>();

  const focusBorderColor = useColorModeValue('brandGold.500', 'brandGold.200');

  return (
    <Control {...controlProps}>
      <InputGroup {...inputProps}>
        {leftElement && <InputLeftElement>{leftElement}</InputLeftElement>}
        {leftAddon && <InputLeftAddon>{leftAddon}</InputLeftAddon>}
        <ChakraInput
          {...register(controlProps.name)}
          type={type}
          focusBorderColor={focusBorderColor}
          placeholder={placeholder}
          defaultValue={defaultValue}
          step={step}
        />
      </InputGroup>
    </Control>
  );
}
