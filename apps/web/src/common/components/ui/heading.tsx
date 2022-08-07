import {
  Heading,
  useColorModeValue,
  type HeadingProps as Props
} from '@chakra-ui/react';

export type HeadingProps = Props;

export const H1 = ({ children, ...headingProps }: HeadingProps) => {
  return (
    <Heading as="h1" {...headingProps}>
      {children}
    </Heading>
  );
};

export const H2 = ({ children, ...headingProps }: HeadingProps) => {
  return (
    <Heading as="h2" size="lg" fontWeight="semibold" {...headingProps}>
      {children}
    </Heading>
  );
};

export const H3 = ({ children, ...headingProps }: HeadingProps) => {
  return (
    <Heading as="h3" size="md" {...headingProps}>
      {children}
    </Heading>
  );
};

export const H4 = ({ children }: HeadingProps) => {
  const color = useColorModeValue('brandGray.600', 'brandGray.400');
  return (
    <Heading as="h4" fontWeight="normal" size="sm" color={color}>
      {children}
    </Heading>
  );
};

export const H5 = ({ children }: HeadingProps) => {
  return <Heading as="h5">{children}</Heading>;
};

export const H6 = ({ children }: HeadingProps) => {
  return <Heading as="h6">{children}</Heading>;
};
