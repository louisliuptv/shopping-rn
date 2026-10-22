import type {
  GoodsGroup,
  Rating,
  Seller,
} from '../../domain/entities/shop';
import type { ShopDataDto } from '../dto/shopDto';
import { mapGoods, mapRatings, mapSeller } from '../mappers/shopMappers';
import type { ShopRepository } from './httpShopRepository';

const fixture = require('../fixtures/shop-data.json') as ShopDataDto;

export class FixtureShopRepository implements ShopRepository {
  constructor(private readonly data: ShopDataDto = fixture) {}

  async getSeller(sellerId: string): Promise<Seller> {
    return mapSeller(this.data.seller, sellerId);
  }

  async getGoods(_sellerId: string): Promise<GoodsGroup[]> {
    return mapGoods(this.data.goods);
  }

  async getRatings(_sellerId: string): Promise<Rating[]> {
    return mapRatings(this.data.ratings);
  }
}
