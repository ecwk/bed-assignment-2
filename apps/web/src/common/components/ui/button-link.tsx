import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import { Button, Link, type ButtonProps } from '@chakra-ui/react';

type Props = ButtonProps & {
  href: string;
  children?: React.ReactNode;
  nextLinkProps?: Omit<NextLinkProps, 'href'>;
};

export const ButtonLink = ({
  href,
  children,
  nextLinkProps,
  ...buttonProps
}: Props) => {
  return (
    <NextLink href={href} passHref {...nextLinkProps}>
      <Button as={Link} {...buttonProps}>
        {children}
      </Button>
    </NextLink>
  );
};
