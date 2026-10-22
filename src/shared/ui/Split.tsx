import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../app/theme/tokens';

export function Split() {
  return <View style={styles.split} />;
}

const styles = StyleSheet.create({
  split: {
    width: '100%',
    height: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rowLine,
    backgroundColor: colors.backgroundSSSS,
  },
});
