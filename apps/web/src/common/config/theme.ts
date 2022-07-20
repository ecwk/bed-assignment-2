import { extendTheme, ThemeConfig, useColorModeValue } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

export const theme = extendTheme({
  colors: {
    brand: {
      50: '#fffadc',
      100: '#ffefb0',
      200: '#fde481',
      300: '#fcd94f',
      400: '#fbce21',
      500: '#e2b50b',
      600: '#b08c03',
      700: '#7d6400',
      800: '#4b3c00',
      900: '#1b1400'
    },
    brandText: '#D2D2D2'
  },
  styles: {
    global: {
      body: {
        background: '#1C1C1C'
      }
    }
  },
  config
});
