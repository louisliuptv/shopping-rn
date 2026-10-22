import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontWeight, space, starGlyphs } from '../../app/theme/tokens';
import { computeStarStates, STAR_TOTAL, type StarState } from '../../domain/usecases/starUseCases';

export type StarSize = keyof typeof starGlyphs;

interface StarProps {
  score: number;
  size?: StarSize;
  testID?: string;
}

export function Star({ score, size = 36, testID }: StarProps) {
  const states = computeStarStates(score);
  const { px, gap } = starGlyphs[size];

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
  glyph: { fontWeight: fontWeight.regular },
  overlay: { position: 'absolute', top: space[0], left: space[0], overflow: 'hidden' },
  a11yOnly: { width: space[0], height: space[0], opacity: 0 },
});
