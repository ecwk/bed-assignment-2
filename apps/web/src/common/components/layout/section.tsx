import { Grid } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';

export type SectionProps = {
  children?: React.ReactNode;
};

export const Section = ({ children }: SectionProps) => {
  return (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
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
    </AnimatePresence>
  );
};
