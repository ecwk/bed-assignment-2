import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type AnimationWrapperProps = {
  children: React.ReactNode;
};

const excludedRoutes = [/\/settings\/.*/, '/settings', '/login', '/signup'];

export function AnimationWrapper({ children }: AnimationWrapperProps) {
  const router = useRouter();

  return (
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      <motion.div
        className="animation-wrapper"
        variants={{
          hidden: { opacity: 0, x: -200, y: 0 },
          enter: { opacity: 1, x: 0, y: 0 },
          exit: { opacity: 0, x: 0, y: -100 }
        }}
        key={
          excludedRoutes.some((route) => router.pathname.match(route))
            ? undefined
            : router.pathname
        }
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: 'linear' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
