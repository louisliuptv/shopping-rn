import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Support } from '../../domain/entities/shop';

const BADGES: Record<number, { label: string; background: string }> = {
  0: { label: 'off', background: '#f07373' },
  1: { label: '%', background: '#fbbd41' },
  2: { label: 'new', background: '#4ea7e8' },
  3: { label: 'inv', background: '#61c47a' },
  4: { label: 'safe', background: '#9b8ade' },
};

const SIZE_MAP: Record<number, { height: number; font: number }> = {
  1: { height: 12, font: 8 },
  2: { height: 16, font: 9 },
  3: { height: 12, font: 8 },
  4: { height: 16, font: 9 },
};

interface SupportTagProps {
  support: Support;
  size?: number;
}

export function SupportTag({ support, size = 1 }: SupportTagProps) {
  const badge = BADGES[support.type] ?? BADGES[2];
  const metrics = SIZE_MAP[size] ?? SIZE_MAP[1];

  return (
    <View
      style={[styles.tag, { height: metrics.height, backgroundColor: badge.background }]}
      accessibilityLabel={support.description}
    >
      <Text
        style={[styles.label, { fontSize: metrics.font, lineHeight: metrics.height }]}
        numberOfLines={1}
      >
        {badge.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    minWidth: 12,
    borderRadius: 2,
  },
  label: { color: '#ffffff', fontWeight: '700' },
});
