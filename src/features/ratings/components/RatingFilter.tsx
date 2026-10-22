import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize } from '../../../app/theme/tokens';
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
  const blocks: Array<{ key: RatingFilterValue; label: string; count: number; kind: 'positive' | 'negative' }> = [
    { key: 'all', label: labels.all, count: counts.all, kind: 'positive' },
    { key: 'positive', label: labels.positive, count: counts.positive, kind: 'positive' },
    { key: 'negative', label: labels.negative, count: counts.negative, kind: 'negative' },
  ];

  return (
    <View style={styles.root}>
      <View style={styles.types}>
        {blocks.map(block => {
          const active = filter === block.key;
          return (
            <Pressable
              key={block.key}
              onPress={() => onChangeFilter(block.key)}
              style={[
                styles.block,
                block.kind === 'negative' ? styles.blockNegative : styles.blockPositive,
                active && (block.kind === 'negative' ? styles.blockNegativeActive : styles.blockPositiveActive),
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              testID={`rating-filter-${block.key}`}
            >
              <Text style={[styles.blockText, active && styles.blockTextActive]}>
                {block.label}
                <Text style={styles.count}> {block.count}</Text>
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        style={styles.switch}
        onPress={onToggleOnlyContent}
        accessibilityRole="switch"
        accessibilityState={{ checked: onlyContent }}
        testID="rating-filter-only-content"
      >
        <View style={[styles.checkbox, onlyContent && styles.checkboxOn]}>
          <Text style={[styles.checkboxMark, onlyContent && styles.checkboxMarkOn]}>✓</Text>
        </View>
        <Text style={styles.switchText}>With comments only</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { backgroundColor: colors.white },
  types: {
    flexDirection: 'row',
    paddingVertical: 18,
    marginHorizontal: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rowLine,
  },
  block: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 1,
    marginRight: 8,
  },
  blockPositive: { backgroundColor: colors.lightBlue },
  blockPositiveActive: { backgroundColor: colors.blue },
  blockNegative: { backgroundColor: colors.lightGreySSS },
  blockNegativeActive: { backgroundColor: colors.grey },
  blockText: { fontSize: fontSize.small, color: colors.grey },
  blockTextActive: { color: colors.white },
  count: { fontSize: fontSize.small },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rowLine,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  checkboxOn: { borderColor: colors.green, backgroundColor: colors.green },
  checkboxMark: { fontSize: 11, color: 'transparent' },
  checkboxMarkOn: { color: colors.white },
  switchText: { fontSize: fontSize.small, color: colors.lightGrey },
});
