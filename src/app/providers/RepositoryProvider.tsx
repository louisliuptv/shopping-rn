import React, { createContext, useContext, useMemo, type ReactNode } from 'react';
import { createShopRepository } from '../../core/di/createShopRepository';
import type { ShopRepository } from '../../data/repositories/httpShopRepository';

const ShopRepositoryContext = createContext<ShopRepository | null>(null);

interface RepositoryProviderProps {
  children: ReactNode;
  repository?: ShopRepository;
}

export function RepositoryProvider({ children, repository }: RepositoryProviderProps) {
  const value = useMemo(
    () => repository ?? createShopRepository(),
    [repository],
  );

  return (
    <ShopRepositoryContext.Provider value={value}>
      {children}
    </ShopRepositoryContext.Provider>
  );
}

export function useShopRepository(): ShopRepository {
  const repository = useContext(ShopRepositoryContext);
  if (!repository) {
    throw new Error('useShopRepository must be used inside <RepositoryProvider>');
  }
  return repository;
}
