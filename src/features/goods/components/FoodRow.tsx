import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize } from '../../../app/theme/tokens';
import type { Food } from '../../../domain/entities/shop';
import { formatPrice } from '../../../domain/usecases/cartUseCases';
import { RemoteImage } from '../../../shared/ui/RemoteImage';
import { CartControl } from '../../cart/components/CartControl';

interface FoodRowProps {
  food: Food;
  onPress: (food: Food) => void;
}

export function FoodRow({ food, onPress }: FoodRowProps) {
  return (
    <Pressable
      style={styles.row}
      onPress={() => onPress(food)}
      testID={`food-row-${food.id}`}
      accessibilityRole="button"
    >
      <RemoteImage uri={food.icon} width={57} height={57} style={styles.icon} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {food.name}
        </Text>
        {food.description ? (
          <Text style={styles.desc} numberOfLines={1}>
            {food.description}
          </Text>
        ) : null}
        <View style={styles.extra}>
          <Text style={styles.extraText}>{food.sellCount} sold</Text>
          <Text style={styles.extraText}>{food.rating}% positive</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>¥{formatPrice(food.price)}</Text>
          {food.oldPrice ? <Text style={styles.oldPrice}>¥{food.oldPrice}</Text> : null}
        </View>
      </View>
      <View style={styles.control}>
        <CartControl foodId={food.id} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginHorizontal: 18,
    marginTop: 18,
    paddingBottom: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rowLine,
  },
  icon: { marginRight: 10, borderRadius: 2 },
  content: { flex: 1, minHeight: 57 },
  name: { fontSize: fontSize.medium, color: colors.darkGrey, marginBottom: 8 },
  desc: { fontSize: fontSize.smallS, color: colors.lightGrey, marginBottom: 8 },
  extra: { flexDirection: 'row', marginBottom: 4 },
  extraText: { fontSize: fontSize.smallS, color: colors.lightGrey, marginRight: 12 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline' },
  price: { fontSize: fontSize.medium, fontWeight: '700', color: colors.red, marginRight: 8 },
  oldPrice: {
    fontSize: fontSize.smallS,
    color: colors.lightGrey,
    textDecorationLine: 'line-through',
  },
  control: { position: 'absolute', right: 0, bottom: 12 },
});
