import type { AxiosInstance } from 'axios';
import { getEnvelope } from '../../core/network/httpClient';
import type {
  GoodsGroupDto,
  RatingDto,
  SellerDto,
} from '../dto/shopDto';

export interface ShopApi {
  fetchSeller(sellerId: string): Promise<SellerDto>;
  fetchGoods(sellerId: string): Promise<GoodsGroupDto[]>;
  fetchRatings(sellerId: string): Promise<RatingDto[]>;
}

export function createShopApi(client: AxiosInstance): ShopApi {
  return {
    fetchSeller: sellerId => getEnvelope<SellerDto>(client, 'seller', { id: sellerId }),
    fetchGoods: sellerId => getEnvelope<GoodsGroupDto[]>(client, 'goods', { id: sellerId }),
    fetchRatings: sellerId => getEnvelope<RatingDto[]>(client, 'ratings', { id: sellerId }),
  };
}
