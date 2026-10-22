import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../app/theme/tokens';
import { computeStarStates, STAR_TOTAL, type StarState } from '../../domain/usecases/starUseCases';

const SIZES = {
  24: { px: 10, gap: 3 },
  36: { px: 15, gap: 6 },
  48: { px: 20, gap: 22 },
} as const;

export type StarSize = keyof typeof SIZES;

interface StarProps {
  score: number;
  size?: StarSize;
  testID?: string;
}

export function Star({ score, size = 36, testID }: StarProps) {
  const states = computeStarStates(score);
  const { px, gap } = SIZES[size];

  return (
    <View style={styles.row} testID={testID ?? `star-${score}`} accessible accessibilityLabel={`Rating ${score}`}>
      {states.map((state: StarState, index: number) => (
        <View
          key={index}
          style={[
            { width: px, height: px },
            index === states.length - 1 ? null : { marginRight: gap },
          ]}
        >
          <Text style={[styles.glyph, { fontSize: px, lineHeight: px, color: colors.lightGreySSS }]}>★</Text>
          {state !== 'off' ? (
            <View
              style={[
                styles.overlay,
                {
                  width: state === 'on' ? px : px / 2,
                  height: px,
                },
              ]}
            >
              <Text style={[styles.glyph, { fontSize: px, lineHeight: px, color: colors.gold }]}>★</Text>
            </View>
          ) : null}
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
  glyph: { fontWeight: '400' },
  overlay: { position: 'absolute', top: 0, left: 0, overflow: 'hidden' },
  a11yOnly: { width: 0, height: 0, opacity: 0 },
});
