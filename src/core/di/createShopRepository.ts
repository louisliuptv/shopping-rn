import { env } from '../config/env';
import { createHttpClient } from '../network/httpClient';
import { createShopApi } from '../../data/api/shopApi';
import { HttpShopRepository } from '../../data/repositories/httpShopRepository';
import { FixtureShopRepository } from '../../data/repositories/fixtureShopRepository';
import { FallbackShopRepository } from '../../data/repositories/fallbackShopRepository';
import type { ShopRepository } from '../../data/repositories/httpShopRepository';

export function createShopRepository(): ShopRepository {
  const httpRepository = new HttpShopRepository(
    createShopApi(createHttpClient(env.apiBaseUrl)),
  );

  if (!env.useFixtureFallback) {
    return httpRepository;
  }

  return new FallbackShopRepository(httpRepository, new FixtureShopRepository());
}
