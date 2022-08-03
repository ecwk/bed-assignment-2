import { Grid } from '@chakra-ui/react';

export type SectionProps = {
  children?: React.ReactNode;
};

export const Section = ({ children }: SectionProps) => {
  return (
    <Grid
      as="section"
      gridArea="section"
      gridTemplateAreas={`
        "navbar"
        "main"
      `}
      gridTemplateRows="auto 1fr"
      overflow="auto"
      h="100vh"
    >
      {children}
    </Grid>
  );
};
