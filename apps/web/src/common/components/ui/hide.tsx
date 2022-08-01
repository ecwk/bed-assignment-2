import { useBreakpoint } from '@chakra-ui/react';

type HideProps = {
  hide?: boolean;
  below?: 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  above?: 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  children?: React.ReactNode;
};

const breakpoints = ['base', 'sm', 'md', 'lg', 'xl', '2xl'];

export const Hide = ({ hide, below, above, children }: HideProps) => {
  const breakpoint = useBreakpoint();

  if (hide) {
    return <></>;
  }

  if (above) {
    const breakpointsToHideOn = breakpoints.slice(breakpoints.indexOf(above));

    return breakpointsToHideOn.includes(breakpoint) ? <></> : <>{children}</>;
  }

  if (below) {
    const breakpointsToHideOn = breakpoints.slice(
      0,
      breakpoints.indexOf(below)
    );

    return breakpointsToHideOn.includes(breakpoint) ? <></> : <>{children}</>;
  }

  return <>{children}</>;
};
