import 'dayjs/locale/en-sg';
import type { AppProps } from 'next/app';

import {
  Redirects,
  Providers,
  Loadpage,
  AppShell,
  Section,
  Sidebar,
  Navbar
} from '@common/components';
import '@common/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Loadpage>
        <Redirects />
        <AppShell>
          <Sidebar />
          <Section>
            <Navbar />
            <Component {...pageProps} />
          </Section>
        </AppShell>
      </Loadpage>
    </Providers>
  );
}

export default MyApp;
