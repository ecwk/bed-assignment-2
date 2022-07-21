import {
  extendTheme,
  ThemeConfig,
  useColorModeValue,
  withDefaultColorScheme
} from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

export const theme = extendTheme({
  colors: {
    // brand: {
    //   50: '#fffadc',
    //   100: '#ffefb0',
    //   200: '#fde481',
    //   300: '#fcd94f',
    //   400: '#fbce21',
    //   500: '#e2b50b',
    //   600: '#b08c03',
    //   700: '#7d6400',
    //   800: '#4b3c00',
    //   900: '#1b1400'
    // },
    brand: {
      50: '#ffe6e6',
      100: '#f8bbbb',
      200: '#ef8f8f',
      300: '#e86464',
      400: '#e03937',
      500: '#c8211e',
      600: '#9b1817',
      700: '#701010',
      800: '#440808',
      900: '#1c0000'
    },
    brandText: '#D2D2D2',
    brandDark: '#1C1C1C'
  },
  styles: {
    global: {
      body: {
        background: 'brandDark'
      }
    }
  },
  config
});
