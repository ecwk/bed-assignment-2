import { env } from '@config/env';

export const sleep = async (ms: number) => {
  if (env.NODE_ENV !== 'production') {
    await new Promise((resolve) => setTimeout(resolve, ms));
  } else {
    const error = new Error('Remove sleep in production');
    console.warn(error);
  }
};
