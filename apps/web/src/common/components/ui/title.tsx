import { Box, Heading, Text, type BoxProps } from '@chakra-ui/react';

export type TitleProps = BoxProps & {
  as?: string;
  title?: string;
  subtitle?: string;
};

export function Title({ as = 'h1', title, subtitle, ...boxProps }: TitleProps) {
  return (
    <Box as="header" maxW="60ch" {...boxProps}>
      <Heading as={as}>{title}</Heading>
      {subtitle && (
        <Text mt={2} color="gray.400">
          {subtitle}
        </Text>
      )}
    </Box>
  );
}
