import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@modules/auth';

const protectedRoutes = ['/dashboard'];
const loginSignupRoutes = ['/login', '/signup'];

export const Redirects = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const path = router.pathname;

    // TODO: Add home page
    if (path === '/') {
      router.push('/dashboard');
    }

    if (user !== undefined) {
      if (!user && protectedRoutes.includes(path)) {
        router.push('/login');
      } else if (user && loginSignupRoutes.includes(path)) {
        // only go back if previous path is in the same domain
        router.push('/dashboard')
      } else {
      }
    }
  }, [user, router, router.pathname]);

  return <></>;
};
