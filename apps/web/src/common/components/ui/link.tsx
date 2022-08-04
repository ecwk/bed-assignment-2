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
  hoverColor?: boolean;
  hoverAnimation?: 'underline' | 'highlight';
};

export const Link = ({
  href,
  children,
  nextLinkProps,
  underline = false,
  icon = false,
  hoverColor = false,
  hoverAnimation,
  ...linkProps
}: LinkProps) => {
  const isUnderline = hoverAnimation === 'underline';
  const isBoxShadow = hoverAnimation === 'highlight';

  return (
    <NextLink href={href} passHref {...nextLinkProps}>
      <ChakraLink
        sx={{
          ':hover': {
            color: hoverColor ? 'brandGold.300' : 'none',
            textDecoration: underline ? 'underline' : 'none',
          },
          ':hover > svg': {
            color: hoverColor ? 'brandGold.300' : 'none'
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
