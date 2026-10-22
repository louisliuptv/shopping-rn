import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../app/query/queryClient';
import { useShopRepository } from '../../../app/providers/RepositoryProvider';

export function useRatings(sellerId: string) {
  const repository = useShopRepository();
  return useQuery({
    queryKey: queryKeys.ratings(sellerId),
    queryFn: () => repository.getRatings(sellerId),
  });
}
