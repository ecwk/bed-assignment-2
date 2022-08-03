import {
  extendTheme,
  ThemeConfig,
  useColorModeValue,
  withDefaultColorScheme
} from '@chakra-ui/react';
import { darken } from 'polished';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

export const theme = extendTheme({
  colors: {
    brandGray: {
      50: '#f1f3f4',
      100: '#e9e9e9',
      200: '#bfc0c1',
      300: '#a4a8ab',
      400: '#888f93',
      500: '#6e767a',
      600: '#565b5e',
      700: '#3f4243',
      800: '#121212',
      900: '#0b0d0e'
    },
    brandRed: {
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
    brandGold: {
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
    brandPaleBlue: {
      50: '#edeffa',
      100: '#d2d5e0',
      200: '#b6b9c8',
      300: '#989eb2',
      400: '#7b849c',
      500: '#616b83',
      600: '#4c5566',
      700: '#363d49',
      800: '#1B2027',
      900: '#060b14'
    },
    brandText: '#D2D2D2'
  },
  breakpoints: {
    sm: '400px',
    md: '768px',
    lg: '1024px',
    xl: '1440px',
    '2xl': '1920px'
  },
  layerStyles: {
    lightModeButton: {
      color: '#1B2026',
      backgroundColor: 'blue.200',
      ':hover': {
        backgroundColor: 'blue.300'
      },
      ':active': {
        backgroundColor: 'blue.400'
      }
    },
    darkModeButton: {
      color: '#1B2026',
      backgroundColor: '#fde481',
      ':hover': {
        backgroundColor: '#fcd94f'
      },
      ':active': {
        backgroundColor: '#fbce21'
      }
    }
  },
  styles: {
    global: (props: Record<string, any>) => ({
      body: {
        background: mode('brandGray.100', 'brandGray.800')(props),
        overflow: 'hidden'
      }
    })
  },
  config
});
