import type {
  GoodsGroup,
  Rating,
  Seller,
} from '../../domain/entities/shop';
import type { ShopRepository } from './httpShopRepository';

export class FallbackShopRepository implements ShopRepository {
  constructor(
    private readonly primary: ShopRepository,
    private readonly fallback: ShopRepository,
    private readonly enabled: boolean = true,
  ) {}

  getSeller(sellerId: string): Promise<Seller> {
    return this.run(
      () => this.primary.getSeller(sellerId),
      () => this.fallback.getSeller(sellerId),
    );
  }

  getGoods(sellerId: string): Promise<GoodsGroup[]> {
    return this.run(
      () => this.primary.getGoods(sellerId),
      () => this.fallback.getGoods(sellerId),
    );
  }

  getRatings(sellerId: string): Promise<Rating[]> {
    return this.run(
      () => this.primary.getRatings(sellerId),
      () => this.fallback.getRatings(sellerId),
    );
  }

  private async run<T>(primary: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
    try {
      return await primary();
    } catch (error) {
      if (!this.enabled) {
        throw error;
      }
      if (__DEV__) {
        console.info(
          '[shop] remote request failed, using bundled fixture.',
          error instanceof Error ? error.message : error,
        );
      }
      return fallback();
    }
  }
}
