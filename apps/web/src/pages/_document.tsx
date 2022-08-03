import { ColorModeScript } from '@chakra-ui/react';
import { Html, Head, Main, NextScript } from 'next/document';

import { theme } from '@config/theme';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <NextScript />
      </body>
    </Html>
  );
}
