import type {
  GoodsGroup,
  Rating,
  Seller,
} from '../../domain/entities/shop';
import type { ShopApi } from '../api/shopApi';
import { mapGoods, mapRatings, mapSeller } from '../mappers/shopMappers';

export interface ShopRepository {
  getSeller(sellerId: string): Promise<Seller>;
  getGoods(sellerId: string): Promise<GoodsGroup[]>;
  getRatings(sellerId: string): Promise<Rating[]>;
}

export class HttpShopRepository implements ShopRepository {
  constructor(private readonly api: ShopApi) {}

  async getSeller(sellerId: string): Promise<Seller> {
    return mapSeller(await this.api.fetchSeller(sellerId), sellerId);
  }

  async getGoods(sellerId: string): Promise<GoodsGroup[]> {
    return mapGoods(await this.api.fetchGoods(sellerId));
  }

  async getRatings(sellerId: string): Promise<Rating[]> {
    return mapRatings(await this.api.fetchRatings(sellerId));
  }
}
