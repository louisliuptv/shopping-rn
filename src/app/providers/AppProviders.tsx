import React, { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { paperTheme } from '../theme/paperTheme';
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
      <PaperProvider theme={paperTheme}>
        <RepositoryProvider repository={repository}>
          <QueryClientProvider client={client}>{children}</QueryClientProvider>
        </RepositoryProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
