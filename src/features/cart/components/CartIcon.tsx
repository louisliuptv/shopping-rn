import React from 'react';
import { StyleSheet, View } from 'react-native';

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
  box: { width: 20, height: 20 },
  basket: {
    position: 'absolute',
    top: 6,
    left: 2,
    width: 15,
    height: 9,
    borderWidth: 1.5,
    borderRadius: 2,
  },
  handle: {
    position: 'absolute',
    top: 3,
    left: 0,
    width: 5,
    height: 2,
    borderRadius: 1,
    transform: [{ rotate: '-18deg' }],
  },
  wheel: {
    position: 'absolute',
    bottom: 1,
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  wheelLeft: { left: 4 },
  wheelRight: { left: 13 },
});
