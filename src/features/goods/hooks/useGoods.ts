import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../app/query/queryClient';
import { useShopRepository } from '../../../app/providers/RepositoryProvider';

export function useGoods(sellerId: string) {
  const repository = useShopRepository();
  return useQuery({
    queryKey: queryKeys.goods(sellerId),
    queryFn: () => repository.getGoods(sellerId),
  });
}
