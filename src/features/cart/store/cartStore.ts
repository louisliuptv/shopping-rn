import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { asyncStateStorage, storageKeys } from '../../../core/storage/kvStorage';

export interface CartState {
  counts: Record<string, number>;
  add: (foodId: string) => void;
  remove: (foodId: string) => void;
  setCount: (foodId: string, count: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    set => ({
      counts: {},
      add: foodId =>
        set(state => ({
          counts: { ...state.counts, [foodId]: (state.counts[foodId] ?? 0) + 1 },
        })),
      remove: foodId =>
        set(state => {
          const current = state.counts[foodId] ?? 0;
          const counts = { ...state.counts };
          if (current <= 1) {
            delete counts[foodId];
          } else {
            counts[foodId] = current - 1;
          }
          return { counts };
        }),
      setCount: (foodId, count) =>
        set(state => {
          const counts = { ...state.counts };
          if (count <= 0) {
            delete counts[foodId];
          } else {
            counts[foodId] = count;
          }
          return { counts };
        }),
      clear: () => set({ counts: {} }),
    }),
    {
      name: storageKeys.cart,
      version: 1,
      storage: createJSONStorage(() => asyncStateStorage),
      partialize: state => ({ counts: state.counts }),
    },
  ),
);

export const selectFoodCount = (foodId: string) => (state: CartState) =>
  state.counts[foodId] ?? 0;
