import type {
  Food,
  GoodsGroup,
  Rating,
  Seller,
} from '../../domain/entities/shop';
import type {
  FoodDto,
  GoodsGroupDto,
  RatingDto,
  SellerDto,
} from '../dto/shopDto';

export function foodId(groupIndex: number, foodIndex: number): string {
  return `g${groupIndex}-f${foodIndex}`;
}

export function mapRating(dto: RatingDto): Rating {
  return {
    username: dto.username ?? '',
    rateTime: Number(dto.rateTime) || 0,
    deliveryTime: dto.deliveryTime,
    score: Number(dto.score) || 0,
    rateType: Number(dto.rateType) || 0,
    text: dto.text ?? '',
    avatar: dto.avatar ?? '',
    recommend: dto.recommend ?? [],
  };
}

export function mapSeller(dto: SellerDto, id: string): Seller {
  return {
    id,
    name: dto.name ?? '',
    description: dto.description ?? '',
    deliveryTime: Number(dto.deliveryTime) || 0,
    minPrice: Number(dto.minPrice) || 0,
    deliveryPrice: Number(dto.deliveryPrice) || 0,
    score: Number(dto.score) || 0,
    serviceScore: Number(dto.serviceScore) || 0,
    foodScore: Number(dto.foodScore) || 0,
    rankRate: Number(dto.rankRate) || 0,
    ratingCount: Number(dto.ratingCount) || 0,
    sellCount: Number(dto.sellCount) || 0,
    bulletin: dto.bulletin ?? '',
    avatar: dto.avatar ?? '',
    pics: dto.pics ?? [],
    infos: dto.infos ?? [],
    supports: dto.supports ?? [],
  };
}

export function mapFood(dto: FoodDto, groupIndex: number, foodIndex: number): Food {
  return {
    id: foodId(groupIndex, foodIndex),
    name: dto.name ?? '',
    price: Number(dto.price) || 0,
    oldPrice: dto.oldPrice ?? '',
    description: dto.description ?? '',
    sellCount: Number(dto.sellCount) || 0,
    rating: Number(dto.rating) || 0,
    info: dto.info ?? '',
    icon: dto.icon ?? '',
    image: dto.image ?? '',
    ratings: (dto.ratings ?? []).map(mapRating),
    groupIndex,
  };
}

export function mapGoods(groups: GoodsGroupDto[]): GoodsGroup[] {
  return groups.map((group, groupIndex) => ({
    name: group.name ?? '',
    type: Number(group.type) || 0,
    foods: (group.foods ?? []).map((food, foodIndex) =>
      mapFood(food, groupIndex, foodIndex),
    ),
  }));
}

export function mapRatings(dtos: RatingDto[]): Rating[] {
  return dtos.map(mapRating);
}
