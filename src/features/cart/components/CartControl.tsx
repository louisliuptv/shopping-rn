import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { space } from '../../../app/theme/tokens';
import { useCartBall } from '../animation/CartBall';
import { selectFoodCount, useCartStore } from '../store/cartStore';

interface CartControlProps {
  foodId: string;
  testID?: string;
}

export function CartControl({ foodId, testID }: CartControlProps) {
  const theme = useTheme();
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
          <IconButton
            icon="minus"
            size={16}
            mode="contained-tonal"
            onPress={() => remove(foodId)}
            style={styles.button}
            testID={`cart-decrease-${foodId}`}
            accessibilityLabel="Decrease quantity"
          />
          <Text variant="labelLarge" testID={`cart-count-${foodId}`} style={{ color: theme.colors.onSurfaceVariant }}>
            {count}
          </Text>
        </>
      ) : null}
      <IconButton
        ref={plusRef}
        icon="plus"
        size={16}
        mode="contained"
        onPress={addWithBall}
        style={styles.button}
        testID={`cart-increase-${foodId}`}
        accessibilityLabel="Increase quantity"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  button: { margin: 0, marginHorizontal: space[2] },
});
