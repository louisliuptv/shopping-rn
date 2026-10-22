import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import { space, radius, metrics } from '../../../app/theme/tokens';
import type { Food } from '../../../domain/entities/shop';
import { formatPrice } from '../../../domain/usecases/cartUseCases';
import { RemoteImage } from '../../../shared/ui/RemoteImage';
import { CartControl } from '../../cart/components/CartControl';

interface FoodRowProps {
  food: Food;
  onPress: (food: Food) => void;
}

export function FoodRow({ food, onPress }: FoodRowProps) {
  const theme = useTheme();

  return (
    <TouchableRipple
      onPress={() => onPress(food)}
      testID={`food-row-${food.id}`}
      accessibilityRole="button"
    >
      <View style={styles.row}>
        <RemoteImage
          uri={food.icon}
          width={metrics.foodThumbSize}
          height={metrics.foodThumbSize}
          borderRadius={radius.m}
          style={styles.thumb}
        />
        <View style={styles.content}>
          <Text variant="titleSmall" numberOfLines={1} style={{ color: theme.colors.onSurface }}>
            {food.name}
          </Text>
          {food.description ? (
            <Text
              variant="bodySmall"
              numberOfLines={1}
              style={{ color: theme.colors.onSurfaceVariant, marginTop: space[2] }}
            >
              {food.description}
            </Text>
          ) : null}
          <Text
            variant="bodySmall"
            numberOfLines={1}
            style={{ color: theme.colors.onSurfaceVariant, marginTop: space[4] }}
          >
            {food.sellCount} sold · {food.rating}% positive
          </Text>
          <View style={styles.priceRow}>
            <Text variant="titleMedium" style={{ color: theme.colors.error }}>
              ¥{formatPrice(food.price)}
            </Text>
            {food.oldPrice ? (
              <Text
                variant="bodySmall"
                style={[styles.oldPrice, { color: theme.colors.onSurfaceVariant }]}
              >
                ¥{food.oldPrice}
              </Text>
            ) : null}
            <View style={styles.control}>
              <CartControl foodId={food.id} />
            </View>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  row: {
    height: metrics.foodRowHeight,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space[18],
  },
  thumb: { marginRight: space[12] },
  content: { flex: 1 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: space[4] },
  oldPrice: { marginLeft: space[6], textDecorationLine: 'line-through' },
  control: { marginLeft: 'auto' },
});
