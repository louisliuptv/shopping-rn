import { QueryClient } from '@tanstack/react-query';

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  });
}

export const queryKeys = {
  seller: (sellerId: string) => ['seller', sellerId] as const,
  goods: (sellerId: string) => ['goods', sellerId] as const,
  ratings: (sellerId: string) => ['ratings', sellerId] as const,
};
