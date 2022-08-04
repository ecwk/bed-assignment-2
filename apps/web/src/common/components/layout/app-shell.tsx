import { useRouter } from 'next/router';
import { Grid, type GridProps } from '@chakra-ui/react';

export type AppShellProps = GridProps & {
  children?: React.ReactNode;
};

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <Grid
      className="app-shell"
      gridTemplateAreas='"sidebar section"'
      gridTemplateColumns="auto 1fr"
      h="100vh"
    >
      {children}
    </Grid>
  );
};
