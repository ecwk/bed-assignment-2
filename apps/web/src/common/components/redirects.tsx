import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@modules/auth';

const protectedRoutes = ['/dashboard', /\/settings\/.*/];

export const Redirects = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const path = router.pathname;

    if (!isLoading) {
      if (!user && protectedRoutes.some((route) => path.match(route))) {
        router.push('/signup');
      }
    }
  }, [user, router, router.pathname]);

  return <></>;
};
