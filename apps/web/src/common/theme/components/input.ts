import { type ComponentStyleConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const Input: ComponentStyleConfig = {
  baseStyle: (props) => ({}),
  variants: {
    outline: (props) => ({
      focusBorderColor: mode('brandGold.500', 'brandGold.300')(props)
    })
  }
};
