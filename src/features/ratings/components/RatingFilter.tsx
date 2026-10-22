import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Checkbox, SegmentedButtons } from 'react-native-paper';
import { space } from '../../../app/theme/tokens';
import type { RatingFilter as RatingFilterValue } from '../../../domain/entities/shop';
import type { RatingCounts } from '../../../domain/usecases/ratingUseCases';

interface RatingFilterProps {
  filter: RatingFilterValue;
  counts: RatingCounts;
  onlyContent: boolean;
  onChangeFilter: (filter: RatingFilterValue) => void;
  onToggleOnlyContent: () => void;
  labels?: { all: string; positive: string; negative: string };
}

export function RatingFilter({
  filter,
  counts,
  onlyContent,
  onChangeFilter,
  onToggleOnlyContent,
  labels = { all: 'All', positive: 'Positive', negative: 'Negative' },
}: RatingFilterProps) {
  return (
    <View style={styles.root}>
      <SegmentedButtons
        value={filter}
        onValueChange={value => onChangeFilter(value as RatingFilterValue)}
        style={styles.types}
        buttons={[
          { value: 'all', label: `${labels.all} ${counts.all}`, testID: 'rating-filter-all' },
          {
            value: 'positive',
            label: `${labels.positive} ${counts.positive}`,
            testID: 'rating-filter-positive',
          },
          {
            value: 'negative',
            label: `${labels.negative} ${counts.negative}`,
            testID: 'rating-filter-negative',
          },
        ]}
      />
      <Checkbox.Item
        testID="rating-filter-only-content"
        label="With comments only"
        position="leading"
        status={onlyContent ? 'checked' : 'unchecked'}
        onPress={onToggleOnlyContent}
        style={styles.switch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: 'transparent' },
  types: { marginHorizontal: space[18], marginVertical: space[12] },
  switch: { paddingHorizontal: space[8] },
});
