import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import {
  Link as ChakraLink,
  type LinkProps as ChakraLinkProps
} from '@chakra-ui/react';

export type LinkProps = ChakraLinkProps & {
  href: string;
  children?: React.ReactNode;
  nextLinkProps?: Omit<NextLinkProps, 'href'>;
  underline?: boolean;
};

export const Link = ({
  href,
  children,
  nextLinkProps,
  underline = false,
  ...linkProps
}: LinkProps) => {
  return (
    <NextLink href={href} passHref {...nextLinkProps}>
      <ChakraLink
        sx={{
          ':hover': {
            textDecoration: underline ? 'underline' : 'none'
          }
        }}
        {...linkProps}
      >
        {children}
      </ChakraLink>
    </NextLink>
  );
};
