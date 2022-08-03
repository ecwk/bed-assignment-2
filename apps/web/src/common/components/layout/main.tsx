import { Box, BoxProps } from '@chakra-ui/react';

export type MainProps = BoxProps & {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export const Main = ({ title, subtitle, children, ...boxProps }: MainProps) => {
  return (
    <Box
      as="main"
      gridArea="main"
      px={{ base: 5, md: 10 }}
      mb="80px"
      {...boxProps}
    >
      {children}
    </Box>
  );
};
