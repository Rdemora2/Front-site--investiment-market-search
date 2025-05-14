import { QueryClient } from "@tanstack/react-query";

const STALE_TIME = 5 * 60 * 1000;

const CACHE_TIME = 10 * 60 * 1000;

const RETRY_COUNT = 1;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: STALE_TIME,
      gcTime: CACHE_TIME,
      retry: RETRY_COUNT,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: RETRY_COUNT,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});
