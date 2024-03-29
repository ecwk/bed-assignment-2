import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { Button, Link, type ButtonProps } from '@chakra-ui/react';

export type ButtonLinkProps = ButtonProps & {
  href: string;
  children?: React.ReactNode;
  nextLinkProps?: Omit<NextLinkProps, 'href'>;
};

export const ButtonLink = ({
  href,
  children,
  nextLinkProps,
  ...buttonProps
}: ButtonLinkProps) => {
  return (
    <NextLink href={href} passHref {...nextLinkProps}>
      <Button
        sx={{
          ':hover': {
            textDecoration: 'none'
          }
        }}
        as={Link}
        {...buttonProps}
      >
        {children}
      </Button>
    </NextLink>
  );
};
