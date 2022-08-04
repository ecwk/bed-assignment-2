import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  type BoxProps
} from '@chakra-ui/react';

export type TitleProps = BoxProps & {
  as?: string;
  title?: string;
  subtitle?: string;
};

export function Title({ as = 'h1', title, subtitle, ...boxProps }: TitleProps) {
  const subtitleColor = useColorModeValue('brandGray.600', 'brandGray.400');

  return (
    <Box as="header" maxW="60ch" {...boxProps}>
      <Heading as={as}>{title}</Heading>
      {subtitle && (
        <Text mt={2} color={subtitleColor}>
          {subtitle}
        </Text>
      )}
    </Box>
  );
}
