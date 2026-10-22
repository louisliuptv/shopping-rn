import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, lineHeight, space, metrics } from '../../../app/theme/tokens';
import type { GoodsGroup } from '../../../domain/entities/shop';
import { Bubble } from '../../../shared/ui/Bubble';
import { SupportTag } from '../../../shared/ui/SupportTag';

interface CategoryNavProps {
  groups: GoodsGroup[];
  countsByGroup: number[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function CategoryNav({ groups, countsByGroup, activeIndex, onSelect }: CategoryNavProps) {
  return (
    <View style={styles.rail}>
      <FlatList
        data={groups}
        keyExtractor={group => group.name}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const active = index === activeIndex;
          return (
            <Pressable
              onPress={() => onSelect(index)}
              style={[styles.item, active && styles.itemActive]}
              testID={`category-${index}`}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <View style={styles.labelRow}>
                {item.type >= 1 ? <SupportTag support={{ type: item.type, description: item.name }} size={3} /> : null}
                <Text style={[styles.label, active && styles.labelActive]} numberOfLines={2}>
                  {item.name}
                </Text>
              </View>
              {countsByGroup[index] > 0 ? (
                <View style={styles.count}>
                  <Bubble count={countsByGroup[index]} />
                </View>
              ) : null}
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rail: {
    width: metrics.categoryRailWidth,
    backgroundColor: colors.backgroundSSSS,
  },
  item: {
    minHeight: metrics.categoryItemMinHeight,
    paddingHorizontal: space[10],
    paddingVertical: space[8],
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSSSS,
  },
  itemActive: { backgroundColor: colors.white },
  labelRow: { flex: 1, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  label: { fontSize: fontSize.small, lineHeight: lineHeight.tight, color: colors.grey },
  labelActive: { color: colors.darkGrey },
  count: { position: 'absolute', right: space[2], top: space[2] },
});
