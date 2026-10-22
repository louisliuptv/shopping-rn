import type { Rating, RatingFilter } from '../entities/shop';

export const POSITIVE_RATETYPE = 0;
export const NEGATIVE_RATETYPE = 1;

export interface RatingCounts {
  all: number;
  positive: number;
  negative: number;
}

export function countRatings(ratings: Rating[]): RatingCounts {
  let positive = 0;
  let negative = 0;
  for (const rating of ratings) {
    if (rating.rateType === POSITIVE_RATETYPE) {
      positive += 1;
    } else if (rating.rateType === NEGATIVE_RATETYPE) {
      negative += 1;
    }
  }
  return { all: ratings.length, positive, negative };
}

export function filterRatings(
  ratings: Rating[],
  filter: RatingFilter,
  onlyContent: boolean,
): Rating[] {
  return ratings.filter(rating => {
    if (onlyContent && !rating.text) {
      return false;
    }
    if (filter === 'all') {
      return true;
    }
    if (filter === 'positive') {
      return rating.rateType === POSITIVE_RATETYPE;
    }
    return rating.rateType === NEGATIVE_RATETYPE;
  });
}

export function rateTypeToFilter(rateType: number): RatingFilter {
  return rateType === NEGATIVE_RATETYPE ? 'negative' : 'positive';
}
