import { useMemo } from 'react';
import type { GoodsGroup } from '../../../domain/entities/shop';
import {
  buildCartEntries,
  summarizeCart,
  type CartSummary,
} from '../../../domain/usecases/cartUseCases';
import { useCartStore } from '../store/cartStore';

export function useCartSummary(goods: GoodsGroup[], minPrice: number): CartSummary {
  const counts = useCartStore(state => state.counts);

  return useMemo(() => {
    const entries = buildCartEntries(goods, counts);
    return summarizeCart(entries, { minPrice });
  }, [goods, counts, minPrice]);
}
