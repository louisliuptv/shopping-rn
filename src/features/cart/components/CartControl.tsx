import React, { useCallback, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  colors,
  fontSize,
  lineHeight,
  fontWeight,
  space,
  radius,
  borderWidth,
  metrics,
} from '../../../app/theme/tokens';
import { useCartBall } from '../animation/CartBall';
import { selectFoodCount, useCartStore } from '../store/cartStore';

interface CartControlProps {
  foodId: string;
  testID?: string;
}

export function CartControl({ foodId, testID }: CartControlProps) {
  const count = useCartStore(selectFoodCount(foodId));
  const add = useCartStore(state => state.add);
  const remove = useCartStore(state => state.remove);
  const cartBall = useCartBall();
  const plusRef = useRef<View>(null);

  const addWithBall = useCallback(() => {
    plusRef.current?.measureInWindow((x, y, width, height) => {
      cartBall?.drop({ x: x + width / 2, y: y + height / 2 });
    });
    add(foodId);
  }, [add, cartBall, foodId]);

  return (
    <View style={styles.row} testID={testID}>
      {count > 0 ? (
        <>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Decrease quantity"
            hitSlop={space[8]}
            onPress={() => remove(foodId)}
            style={styles.button}
            testID={`cart-decrease-${foodId}`}
          >
            <Text style={styles.symbol}>−</Text>
          </Pressable>
          <Text style={styles.count} testID={`cart-count-${foodId}`}>
            {count}
          </Text>
        </>
      ) : null}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Increase quantity"
        hitSlop={space[8]}
        onPress={addWithBall}
        style={styles.button}
        ref={plusRef}
        testID={`cart-increase-${foodId}`}
      >
        <Text style={styles.symbol}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  button: {
    width: metrics.cartControlSize,
    height: metrics.cartControlSize,
    borderRadius: radius.pill,
    borderWidth: borderWidth.thin,
    borderColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    padding: space[0],
  },
  symbol: {
    color: colors.blue,
    fontSize: fontSize.large,
    lineHeight: lineHeight.body,
    fontWeight: fontWeight.semibold,
  },
  count: {
    minWidth: metrics.cartControlMinWidth,
    textAlign: 'center',
    fontSize: fontSize.smallS,
    color: colors.grey,
  },
});
