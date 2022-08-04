import {
  Link as ChakraLink,
  type LinkProps as ChakraLinkProps
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';

export type LinkProps = ChakraLinkProps & {
  href: string;
  children?: React.ReactNode;
  nextLinkProps?: Omit<NextLinkProps, 'href'>;
  underline?: boolean;
  icon?: boolean;
};

export const Link = ({
  href,
  children,
  nextLinkProps,
  underline = false,
  icon = false,
  ...linkProps
}: LinkProps) => {
  return (
    <NextLink href={href} passHref {...nextLinkProps}>
      <ChakraLink
        sx={{
          ':hover': {
            color: 'brandGold.300',
            textDecoration: underline ? 'underline' : 'none'
          },
          ':hover > svg': {
            color: 'brandGold.300'
          }
        }}
        {...linkProps}
      >
        {children}
        {icon && (
          <ExternalLinkIcon
            style={{
              marginLeft: '0.5rem',
              marginBottom: '0.2em'
            }}
            fontSize="16px"
          />
        )}
      </ChakraLink>
    </NextLink>
  );
};
