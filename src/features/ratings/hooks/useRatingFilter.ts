import { useCallback, useState } from 'react';
import type { RatingFilter as RatingFilterValue } from '../../../domain/entities/shop';

export function useRatingFilter() {
  const [filter, setFilter] = useState<RatingFilterValue>('all');
  const [onlyContent, setOnlyContent] = useState(true);

  const toggleOnlyContent = useCallback(() => {
    setOnlyContent(value => !value);
  }, []);

  return { filter, setFilter, onlyContent, toggleOnlyContent };
}
