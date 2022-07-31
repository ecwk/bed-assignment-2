import axios from 'axios';

import { sleep } from 'src/common/utils';
import { env } from './env';

// Used in browser
export const client = axios.create({
  baseURL: env.apiUrl
});

// Used in Next server (SSR)
export const server = axios.create({
  baseURL: env.apiUrl
});

// Mock delays for development
if (env.NODE_ENV === 'development') {
  client.interceptors.response.use(
    async (response) => {
      await sleep(env.delay);
      return response;
    },
    async (error) => {
      await sleep(env.delay);
      return Promise.reject(error);
    }
  );

  server.interceptors.response.use(async (response) => {
    if (env.NODE_ENV === 'development') {
      await sleep(env.delay);
    }
    return response;
  });
}
