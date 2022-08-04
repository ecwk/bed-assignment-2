import { useRouter } from 'next/router';
import { Box, BoxProps } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

export type MainProps = BoxProps & {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export const Main = ({ title, subtitle, children, ...boxProps }: MainProps) => {
  const router = useRouter();

  return (
    <Box
      as={motion.main}
      gridArea="main"
      px={{ base: 5, md: 10 }}
      mb="80px"
      key={router.pathname}
      initial={{ opacity: 0, x: -200, y: 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 0, y: -100 }}
      transition={{ type: 'linear' }}
      {...boxProps}
    >
      {children}
    </Box>
  );
};
