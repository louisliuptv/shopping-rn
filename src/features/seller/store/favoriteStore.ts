import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { asyncStateStorage, storageKeys } from '../../../core/storage/kvStorage';

interface FavoriteState {
  favoriteBySeller: Record<string, boolean>;
  isFavorite: (sellerId: string) => boolean;
  toggle: (sellerId: string) => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favoriteBySeller: {},
      isFavorite: sellerId => Boolean(get().favoriteBySeller[sellerId]),
      toggle: sellerId =>
        set(state => ({
          favoriteBySeller: {
            ...state.favoriteBySeller,
            [sellerId]: !state.favoriteBySeller[sellerId],
          },
        })),
    }),
    {
      name: storageKeys.favorites,
      version: 1,
      storage: createJSONStorage(() => asyncStateStorage),
      partialize: state => ({ favoriteBySeller: state.favoriteBySeller }),
    },
  ),
);
