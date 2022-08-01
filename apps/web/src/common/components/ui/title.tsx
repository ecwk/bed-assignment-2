import { Box, Heading, Text, type BoxProps } from '@chakra-ui/react';

export type TitleProps = BoxProps & {
  as?: string;
  title?: string;
  subtitle?: string;
};

export function Title({ as = 'h1', title, subtitle, ...boxProps }: TitleProps) {
  return (
    <Box as="header" {...boxProps}>
      <Heading as={as}>{title}</Heading>
      {subtitle && <Text color="gray.400">{subtitle}</Text>}
    </Box>
  );
}
