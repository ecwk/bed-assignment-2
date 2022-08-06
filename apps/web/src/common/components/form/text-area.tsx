import {
  Textarea as ChakraTextarea,
  useColorModeValue,
  type TextareaProps as ChakraTextareaProps
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { type HTMLInputTypeAttribute } from 'react';

import { Control, type ControlProps } from '@common/components';

export type TextareaProps = ControlProps & {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string;
  textAreaProps?: ChakraTextareaProps;
  name: string;
};

export const Textarea = ({
  type,
  placeholder,
  defaultValue,
  name,
  ...controlProps
}: TextareaProps) => {
  const { register } = useFormContext<Record<string, any>>();

  const focusBorderColor = useColorModeValue('brandGold.500', 'brandGold.200');

  return (
    <Control name={name} {...controlProps}>
      <ChakraTextarea
        {...register(name)}
        focusBorderColor={focusBorderColor}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </Control>
  );
};
