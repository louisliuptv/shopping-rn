import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize } from '../../app/theme/tokens';

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
    minWidth: 16,
    height: 16,
    paddingHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red,
  },
  text: {
    color: colors.white,
    fontSize: fontSize.smallS,
    fontWeight: '700',
    fontFamily: 'Helvetica',
  },
});
