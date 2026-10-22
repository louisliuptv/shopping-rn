import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, fontWeight, space, radius, metrics } from '../../app/theme/tokens';

export function Bubble({ count, testID }: { count: number; testID?: string }) {
  if (!count) {
    return null;
  }
  return (
    <View style={styles.bubble} testID={testID}>
      <Text style={styles.text} numberOfLines={1}>
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    minWidth: metrics.bubbleMinWidth,
    height: metrics.bubbleHeight,
    paddingHorizontal: space[5],
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red,
  },
  text: {
    color: colors.white,
    fontSize: fontSize.smallS,
    fontWeight: fontWeight.bold,
    fontFamily: 'Helvetica',
  },
});
