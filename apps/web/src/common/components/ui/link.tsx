import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { Link as ChakraLink, type LinkProps } from '@chakra-ui/react';

type Props = LinkProps & {
  href: string;
  children?: React.ReactNode;
  nextLinkProps?: Omit<NextLinkProps, 'href'>;
};

export const Link = ({
  href,
  children,
  nextLinkProps,
  ...linkProps
}: Props) => {
  return (
    <NextLink href={href} passHref {...nextLinkProps}>
      <ChakraLink {...linkProps}>{children}</ChakraLink>
    </NextLink>
  );
};
