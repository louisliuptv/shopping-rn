import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../app/query/queryClient';
import { useShopRepository } from '../../../app/providers/RepositoryProvider';

export function useSeller(sellerId: string) {
  const repository = useShopRepository();
  return useQuery({
    queryKey: queryKeys.seller(sellerId),
    queryFn: () => repository.getSeller(sellerId),
  });
}
