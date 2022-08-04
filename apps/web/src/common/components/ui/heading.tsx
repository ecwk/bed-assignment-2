import { Heading, type HeadingProps as Props } from '@chakra-ui/react';

export type HeadingProps = Props;

export const H1 = ({ children }: HeadingProps) => {
  return (
    <Heading color="" as="h1">
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

export const H3 = ({ children }: HeadingProps) => {
  return <Heading as="h3">{children}</Heading>;
};

export const H4 = ({ children }: HeadingProps) => {
  return <Heading as="h4">{children}</Heading>;
};

export const H5 = ({ children }: HeadingProps) => {
  return <Heading as="h5">{children}</Heading>;
};

export const H6 = ({ children }: HeadingProps) => {
  return <Heading as="h6">{children}</Heading>;
};
