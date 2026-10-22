import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize } from '../../../app/theme/tokens';
import { countRatings, filterRatings } from '../../../domain/usecases/ratingUseCases';
import { useRatingFilter } from '../../ratings/hooks/useRatingFilter';
import { RatingFilter } from '../../ratings/components/RatingFilter';
import { RatingRow } from '../../ratings/components/RatingRow';
import { EmptyState } from '../../../shared/ui/AsyncState';

interface FoodRatingSectionProps {
  ratings: import('../../../domain/entities/shop').Rating[];
}

export function FoodRatingSection({ ratings }: FoodRatingSectionProps) {
  const { filter, setFilter, onlyContent, toggleOnlyContent } = useRatingFilter();
  const counts = React.useMemo(() => countRatings(ratings), [ratings]);
  const visible = React.useMemo(
    () => filterRatings(ratings, filter, onlyContent),
    [ratings, filter, onlyContent],
  );

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Reviews</Text>
      <RatingFilter
        filter={filter}
        counts={counts}
        onlyContent={onlyContent}
        onChangeFilter={setFilter}
        onToggleOnlyContent={toggleOnlyContent}
      />
      <View style={styles.wrapper}>
        {visible.length ? (
          visible.map((rating, index) => (
            <RatingRow
              key={`${rating.username}-${rating.rateTime}-${index}`}
              rating={rating}
              compact
            />
          ))
        ) : (
          <EmptyState message="No reviews yet" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { paddingTop: 18 },
  title: {
    fontSize: fontSize.medium,
    color: colors.darkGrey,
    marginLeft: 18,
    marginBottom: 4,
  },
  wrapper: { paddingHorizontal: 18 },
});
