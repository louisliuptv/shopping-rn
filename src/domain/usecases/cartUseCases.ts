import dayjs from 'dayjs';
import type { Food, GoodsGroup } from '../../domain/entities/shop';

export function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

export function formatPrice(value: number): string {
  const rounded = roundMoney(value);
  if (Number.isInteger(rounded)) {
    return String(rounded);
  }
  return rounded.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
}

export function formatDateTime(timestamp: number): string {
  return dayjs(timestamp).format('YYYY-MM-DD hh:mm');
}

export interface CartEntry {
  food: Food;
  count: number;
}

export function buildCartEntries(
  goods: GoodsGroup[],
  counts: Record<string, number>,
): CartEntry[] {
  const entries: CartEntry[] = [];
  for (const group of goods) {
    for (const food of group.foods) {
      const count = counts[food.id] ?? 0;
      if (count > 0) {
        entries.push({ food, count });
      }
    }
  }
  return entries;
}

export interface CartSummary {
  entries: CartEntry[];
  totalCount: number;
  totalPrice: number;
  payDesc: string;
  payEnabled: boolean;
}

export function summarizeCart(
  entries: CartEntry[],
  options: { minPrice: number },
): CartSummary {
  const { minPrice } = options;
  let totalCount = 0;
  let totalPrice = 0;

  for (const entry of entries) {
    totalCount += entry.count;
    totalPrice += entry.food.price * entry.count;
  }
  totalPrice = roundMoney(totalPrice);

  let payDesc: string;
  if (totalPrice === 0) {
    payDesc = `¥${formatPrice(minPrice)} min order`;
  } else if (totalPrice < minPrice) {
    payDesc = `¥${formatPrice(minPrice - totalPrice)} to go`;
  } else {
    payDesc = 'Checkout';
  }

  return {
    entries,
    totalCount,
    totalPrice,
    payDesc,
    payEnabled: totalCount > 0 && totalPrice >= minPrice,
  };
}

export function countByGroup(
  goods: GoodsGroup[],
  counts: Record<string, number>,
): number[] {
  return goods.map(group =>
    group.foods.reduce((sum, food) => sum + (counts[food.id] ?? 0), 0),
  );
}
