import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { colors, radius, metrics, supportTagSizes } from '../../app/theme/tokens';
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
    <Surface
      elevation={0}
      style={[styles.tag, { height: variant.height, backgroundColor: badge.background }]}
      accessibilityLabel={support.description}
    >
      <Text style={{ color: colors.white, fontSize: variant.font, lineHeight: variant.height }}>
        {badge.label}
      </Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  tag: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    minWidth: metrics.supportTagMinWidth,
    borderRadius: radius.s,
  },
});
