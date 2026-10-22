import React from 'react';
import { StyleSheet, View } from 'react-native';
import { icons, space, radius, borderWidth } from '../../../app/theme/tokens';

export function CartIcon({ color }: { color: string }) {
  return (
    <View style={styles.box}>
      <View style={[styles.basket, { borderColor: color }]} />
      <View style={[styles.handle, { backgroundColor: color }]} />
      <View style={[styles.wheel, styles.wheelLeft, { backgroundColor: color }]} />
      <View style={[styles.wheel, styles.wheelRight, { backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: icons.cart.size, height: icons.cart.size },
  basket: {
    position: 'absolute',
    top: icons.cart.basketTop,
    left: icons.cart.basketLeft,
    width: icons.cart.basketWidth,
    height: icons.cart.basketHeight,
    borderWidth: borderWidth.medium,
    borderRadius: radius.s,
  },
  handle: {
    position: 'absolute',
    top: icons.cart.handleTop,
    left: space[0],
    width: icons.cart.handleWidth,
    height: icons.cart.handleHeight,
    borderRadius: radius.xs,
    transform: [{ rotate: '-18deg' }],
  },
  wheel: {
    position: 'absolute',
    bottom: icons.cart.wheelBottom,
    width: icons.cart.wheelSize,
    height: icons.cart.wheelSize,
    borderRadius: radius.pill,
  },
  wheelLeft: { left: icons.cart.wheelLeft },
  wheelRight: { left: icons.cart.wheelRight },
});
