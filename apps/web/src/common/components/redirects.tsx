import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@modules/auth';

const protectedRoutes = ['/dashboard', /\/settings.*/, /\/admin.*/];
const adminRoutes = [/\/admin.*/];

export const Redirects = () => {
  const router = useRouter();
  const { user, isLoading, isAdmin } = useAuth();

  useEffect(() => {
    const path = router.pathname;

    if (!isLoading) {
      if (!user && protectedRoutes.some((route) => path.match(route))) {
        router.push('/login');
      } else if (
        user &&
        !isAdmin &&
        adminRoutes.some((route) => path.match(route))
      ) {
        router.push('/');
      }
    }
  }, [user, router, router.pathname]);

  return <></>;
};
