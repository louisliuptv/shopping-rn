export interface Support {
  type: number;
  description: string;
}

export interface Seller {
  id: string;
  name: string;
  description: string;
  deliveryTime: number;
  minPrice: number;
  deliveryPrice: number;
  score: number;
  serviceScore: number;
  foodScore: number;
  rankRate: number;
  ratingCount: number;
  sellCount: number;
  bulletin: string;
  avatar: string;
  pics: string[];
  infos: string[];
  supports: Support[];
}

export interface Rating {
  username: string;
  rateTime: number;
  deliveryTime?: number;
  score: number;
  rateType: number;
  text: string;
  avatar: string;
  recommend: string[];
}

export interface Food {
  id: string;
  name: string;
  price: number;
  oldPrice: string;
  description: string;
  sellCount: number;
  rating: number;
  info: string;
  icon: string;
  image: string;
  ratings: Rating[];
  groupIndex: number;
}

export interface GoodsGroup {
  name: string;
  type: number;
  foods: Food[];
}

export type RatingFilter = 'all' | 'positive' | 'negative';
