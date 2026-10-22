import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  colors,
  fontWeight,
  space,
  radius,
  metrics,
  supportTagSizes,
} from '../../app/theme/tokens';
import type { Support } from '../../domain/entities/shop';

const BADGES: Record<number, { label: string; background: string }> = {
  0: { label: 'off', background: colors.supportOff },
  1: { label: '%', background: colors.supportDiscount },
  2: { label: 'new', background: colors.supportNew },
  3: { label: 'inv', background: colors.supportInvoice },
  4: { label: 'safe', background: colors.supportSafe },
};

interface SupportTagProps {
  support: Support;
  size?: number;
}

export function SupportTag({ support, size = 1 }: SupportTagProps) {
  const badge = BADGES[support.type] ?? BADGES[2];
  const variant = supportTagSizes[size as keyof typeof supportTagSizes] ?? supportTagSizes[1];

  return (
    <View
      style={[styles.tag, { height: variant.height, backgroundColor: badge.background }]}
      accessibilityLabel={support.description}
    >
      <Text
        style={[styles.label, { fontSize: variant.font, lineHeight: variant.height }]}
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
    paddingHorizontal: space[3],
    minWidth: metrics.supportTagMinWidth,
    borderRadius: radius.s,
  },
  label: { color: colors.white, fontWeight: fontWeight.bold },
});
