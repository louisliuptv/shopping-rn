import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import { colors, space, metrics } from '../../../app/theme/tokens';
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
  const theme = useTheme();

  return (
    <View style={[styles.rail, { backgroundColor: theme.colors.surfaceVariant }]}>
      <FlatList
        data={groups}
        keyExtractor={group => group.name}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const active = index === activeIndex;
          return (
            <TouchableRipple
              onPress={() => onSelect(index)}
              testID={`category-${index}`}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              style={[styles.item, active ? styles.itemActive : styles.itemInactive]}
            >
              <>
                <View style={styles.labelRow}>
                  {item.type >= 1 ? (
                    <SupportTag support={{ type: item.type, description: item.name }} size={3} />
                  ) : null}
                  <Text
                    variant="labelMedium"
                    numberOfLines={2}
                    style={[styles.label, active ? styles.labelActive : null]}
                  >
                    {item.name}
                  </Text>
                </View>
                {countsByGroup[index] > 0 ? (
                  <View style={styles.count}>
                    <Bubble count={countsByGroup[index]} />
                  </View>
                ) : null}
              </>
            </TouchableRipple>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rail: { width: metrics.categoryRailWidth },
  item: {
    minHeight: metrics.categoryItemMinHeight,
    paddingHorizontal: space[10],
    paddingVertical: space[8],
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 2,
  },
  itemActive: { backgroundColor: colors.white, borderLeftColor: colors.blue },
  itemInactive: { backgroundColor: colors.backgroundSSSS, borderLeftColor: 'transparent' },
  labelRow: { flex: 1, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  label: { marginLeft: space[2], color: colors.grey },
  labelActive: { color: colors.darkGrey },
  count: { position: 'absolute', right: space[2], top: space[2] },
});
