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

export const colors = {
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
  brandText: '#D2D2D2',
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
  }
};

export const theme = extendTheme({
  colors,
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
        background: mode('#e9e9e9', 'brandPaleBlue.800')(props)
      }
    })
  },
  config
});
