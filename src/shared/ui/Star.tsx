import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, useTheme } from 'react-native-paper';
import { colors, starGlyphs } from '../../app/theme/tokens';
import { computeStarStates, STAR_TOTAL, type StarState } from '../../domain/usecases/starUseCases';

export type StarSize = keyof typeof starGlyphs;

interface StarProps {
  score: number;
  size?: StarSize;
  testID?: string;
}

const SOURCE: Record<StarState, string> = {
  on: 'star',
  half: 'star-half-full',
  off: 'star-outline',
};

export function Star({ score, size = 36, testID }: StarProps) {
  const theme = useTheme();
  const states = computeStarStates(score);
  const { px, gap } = starGlyphs[size];

  return (
    <View
      style={styles.row}
      testID={testID ?? `star-${score}`}
      accessible
      accessibilityLabel={`Rating ${score}`}
    >
      {states.map((state: StarState, index: number) => (
        <View
          key={index}
          testID={`star-glyph-${index}-${state}`}
          style={[styles.slot, { width: px, height: px }, index === states.length - 1 ? null : { marginRight: gap }]}
        >
          <Icon
            source={SOURCE[state]}
            size={px}
            color={state === 'off' ? theme.colors.outlineVariant : colors.gold}
          />
        </View>
      ))}
      <View style={styles.a11yOnly}>
        <Text>{`${states.filter(s => s === 'on').length} / ${STAR_TOTAL}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  slot: { alignItems: 'center', justifyContent: 'center' },
  a11yOnly: { width: 0, height: 0, opacity: 0 },
});
