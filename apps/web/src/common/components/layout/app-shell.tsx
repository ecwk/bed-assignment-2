import { Grid, type GridProps } from '@chakra-ui/react';
import { AnimateSharedLayout, motion } from 'framer-motion';
import { useRouter } from 'next/router';

export type AppShellProps = GridProps & {
  children?: React.ReactNode;
};

export const hideSidebarPaths = [/\/login/, /\/signup/];

export const AppShell = ({ children }: AppShellProps) => {
  const router = useRouter();

  const isHiddenSidebar = hideSidebarPaths.some((path) =>
    path.test(router.pathname)
  );

  return (
    <Grid
      className="app-shell"
      gridTemplateAreas={
        isHiddenSidebar
          ? `
          "section"
          "section"
        `
          : `
          "sidebar section"
          "sidebar section"
        `
      }
      gridTemplateColumns={isHiddenSidebar ? '1fr' : 'auto 1fr'}
      h="100vh"
    >
      {children}
    </Grid>
  );
};
