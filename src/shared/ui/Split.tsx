import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { metrics } from '../../app/theme/tokens';

export function Split() {
  const theme = useTheme();
  return <View style={[styles.split, { backgroundColor: theme.colors.surfaceVariant }]} />;
}

const styles = StyleSheet.create({
  split: { height: metrics.splitHeight },
});
