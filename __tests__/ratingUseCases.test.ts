import type { Rating } from '../src/domain/entities/shop';
import {
  countRatings,
  filterRatings,
} from '../src/domain/usecases/ratingUseCases';

const rating = (rateType: number, text: string): Rating => ({
  username: `${rateType}-${text}`,
  rateTime: 1469281964000,
  score: 4,
  rateType,
  text,
  avatar: '',
  recommend: [],
});

const ratings = [
  rating(0, 'Delicious'),
  rating(0, ''),
  rating(1, 'A bit cold'),
  rating(1, ''),
];

describe('rating use-cases', () => {
  it('counts all / positive / negative', () => {
    expect(countRatings(ratings)).toEqual({ all: 4, positive: 2, negative: 2 });
  });

  it('filters by tab', () => {
    expect(filterRatings(ratings, 'all', false)).toHaveLength(4);
    expect(filterRatings(ratings, 'positive', false)).toHaveLength(2);
    expect(filterRatings(ratings, 'negative', false)).toHaveLength(2);
  });

  it('applies the "only with content" switch on top of the tab', () => {
    expect(filterRatings(ratings, 'all', true)).toHaveLength(2);
    expect(filterRatings(ratings, 'positive', true)).toHaveLength(1);
    expect(filterRatings(ratings, 'negative', true)).toHaveLength(1);
    expect(filterRatings(ratings, 'negative', true)[0].text).toBe('A bit cold');
  });
});
