import {
  extendTheme,
  ThemeConfig,
  useColorModeValue,
  withDefaultColorScheme
} from '@chakra-ui/react';
import { darken } from 'polished';
import { mode } from '@chakra-ui/theme-tools';

import { colors } from './foundations';
import { components } from './components';
import { semanticTokens } from './semantic-tokens';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

export const theme = extendTheme({
  colors,
  semanticTokens,
  components,
  breakpoints: {
    sm: '400px',
    md: '768px',
    lg: '1024px',
    xl: '1440px',
    '2xl': '1920px'
  },
  styles: {
    global: (props: Record<string, any>) => ({
      body: {
        // background: mode('brandGray.50', 'brandGray.800')(props),
        overflow: 'clip'
      }
    })
  },
  config
});
