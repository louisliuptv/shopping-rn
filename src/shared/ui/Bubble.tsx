import React from 'react';
import { Badge } from 'react-native-paper';
import { colors, metrics } from '../../app/theme/tokens';

interface BubbleProps {
  count: number;
  testID?: string;
}

export function Bubble({ count, testID }: BubbleProps) {
  if (!count) {
    return null;
  }
  return (
    <Badge
      testID={testID}
      size={metrics.bubbleHeight}
      style={{ backgroundColor: colors.red }}
    >
      {count > 99 ? '99+' : count}
    </Badge>
  );
}
