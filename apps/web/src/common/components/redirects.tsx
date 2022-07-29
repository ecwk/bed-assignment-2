import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@modules/auth';

const protectedRoutes = ['/dashboard'];

export const Redirects = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const path = router.pathname;

    if (user !== undefined) {
      if (!user && protectedRoutes.includes(path)) {
        router.push('/signup');
      } else if (user && '/login' === path) {
        router.push('/search')
      } else {
      }
    }
  }, [user, router, router.pathname]);

  return <></>;
};
