import React, { useCallback, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize } from '../../../app/theme/tokens';
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
            hitSlop={8}
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
        hitSlop={8}
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
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  symbol: {
    color: colors.blue,
    fontSize: fontSize.large,
    lineHeight: 18,
    fontWeight: '600',
  },
  count: {
    minWidth: 26,
    textAlign: 'center',
    fontSize: fontSize.smallS,
    color: colors.grey,
  },
});
