export interface SupportDto {
  type: number;
  description: string;
}

export interface SellerDto {
  name: string;
  description: string;
  deliveryTime: number;
  score: number;
  serviceScore: number;
  foodScore: number;
  rankRate: number;
  minPrice: number;
  deliveryPrice: number;
  ratingCount: number;
  sellCount: number;
  bulletin: string;
  avatar: string;
  pics: string[];
  infos: string[];
  supports: SupportDto[];
}

export interface RatingDto {
  username: string;
  rateTime: number;
  deliveryTime?: number;
  score: number;
  rateType: number;
  text: string;
  avatar: string;
  recommend?: string[];
}

export interface FoodDto {
  name: string;
  price: number;
  oldPrice: string;
  description: string;
  sellCount: number;
  rating: number;
  info: string;
  icon: string;
  image: string;
  ratings?: RatingDto[];
  count?: number;
}

export interface GoodsGroupDto {
  name: string;
  type: number;
  foods: FoodDto[];
}

export interface ShopDataDto {
  seller: SellerDto;
  goods: GoodsGroupDto[];
  ratings: RatingDto[];
}
