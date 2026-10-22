import React, { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createQueryClient } from '../query/queryClient';
import { RepositoryProvider } from './RepositoryProvider';
import type { ShopRepository } from '../../data/repositories/httpShopRepository';

interface AppProvidersProps {
  children: ReactNode;
  repository?: ShopRepository;
  queryClient?: QueryClient;
}

export function AppProviders({ children, repository, queryClient }: AppProvidersProps) {
  const [client] = useState(() => queryClient ?? createQueryClient());

  return (
    <SafeAreaProvider>
      <RepositoryProvider repository={repository}>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </RepositoryProvider>
    </SafeAreaProvider>
  );
}
