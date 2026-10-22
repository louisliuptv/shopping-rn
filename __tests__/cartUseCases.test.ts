import {
  buildCartEntries,
  countByGroup,
  formatPrice,
  roundMoney,
  summarizeCart,
} from '../src/domain/usecases/cartUseCases';
import type { Food, GoodsGroup } from '../src/domain/entities/shop';

const food = (id: string, price: number): Food => ({
  id,
  name: `food-${id}`,
  price,
  oldPrice: '',
  description: '',
  sellCount: 0,
  rating: 100,
  info: '',
  icon: '',
  image: '',
  ratings: [],
  groupIndex: 0,
});

const goods: GoodsGroup[] = [
  {
    name: 'Popular',
    type: -1,
    foods: [food('g0-f0', 10), food('g0-f1', 20)],
  },
  {
    name: 'Solo sets',
    type: 2,
    foods: [food('g1-f0', 30)],
  },
];

describe('cart use-cases', () => {
  it('builds entries in menu order and skips empty counts', () => {
    const entries = buildCartEntries(goods, { 'g1-f0': 2, 'g0-f1': 1, unknown: 5 });
    expect(entries.map(entry => entry.food.id)).toEqual(['g0-f1', 'g1-f0']);
    expect(entries.map(entry => entry.count)).toEqual([1, 2]);
  });

  it('sums count and price', () => {
    const summary = summarizeCart(buildCartEntries(goods, { 'g0-f0': 2, 'g1-f0': 1 }), {
      minPrice: 20,
    });
    expect(summary.totalCount).toBe(3);
    expect(summary.totalPrice).toBe(50);
    expect(summary.payEnabled).toBe(true);
    expect(summary.payDesc).toBe('Checkout');
  });

  it('describes the empty cart with the min order price', () => {
    const summary = summarizeCart([], { minPrice: 20 });
    expect(summary.totalPrice).toBe(0);
    expect(summary.totalCount).toBe(0);
    expect(summary.payEnabled).toBe(false);
    expect(summary.payDesc).toBe('¥20 min order');
  });

  it('describes how much is missing before the min order price', () => {
    const summary = summarizeCart(buildCartEntries(goods, { 'g0-f0': 1 }), { minPrice: 28 });
    expect(summary.payDesc).toBe('¥18 to go');
    expect(summary.payEnabled).toBe(false);
  });

  it('counts items per goods group for the category rail bubbles', () => {
    expect(countByGroup(goods, { 'g0-f0': 1, 'g0-f1': 2, 'g1-f0': 4 })).toEqual([3, 4]);
    expect(countByGroup(goods, {})).toEqual([0, 0]);
  });

  it('rounds money and trims trailing zeros', () => {
    expect(roundMoney(0.1 + 0.2)).toBe(0.3);
    expect(formatPrice(10)).toBe('10');
    expect(formatPrice(12.5)).toBe('12.5');
    expect(formatPrice(12.0)).toBe('12');
    expect(formatPrice(12.456)).toBe('12.46');
  });
});
