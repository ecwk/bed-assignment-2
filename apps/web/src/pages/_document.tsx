import { ColorModeScript } from '@chakra-ui/react';
import { Html, Head, Main, NextScript } from 'next/document';

import { chakraTheme } from 'src/common/config';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <ColorModeScript
          initialColorMode={chakraTheme.config.initialColorMode}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
