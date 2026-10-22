import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, lineHeight, space, radius, metrics } from '../../../app/theme/tokens';
import type { Rating } from '../../../domain/entities/shop';
import { formatDateTime } from '../../../domain/usecases/cartUseCases';
import { NEGATIVE_RATETYPE } from '../../../domain/usecases/ratingUseCases';
import { RemoteImage } from '../../../shared/ui/RemoteImage';
import { Star } from '../../../shared/ui/Star';

interface RatingRowProps {
  rating: Rating;
  compact?: boolean;
}

export function RatingRow({ rating, compact = false }: RatingRowProps) {
  const negative = rating.rateType === NEGATIVE_RATETYPE;

  if (compact) {
    return (
      <View style={styles.compactRow}>
        <View style={styles.compactHead}>
          <Text style={styles.compactName}>{rating.username}</Text>
          <RemoteImage
            uri={rating.avatar}
            width={metrics.ratingAvatarSmallSize}
            height={metrics.ratingAvatarSmallSize}
            borderRadius={radius.pill}
          />
        </View>
        <Text style={styles.time}>{formatDateTime(rating.rateTime)}</Text>
        <View style={styles.textRow}>
          <Text style={[styles.thumb, negative ? styles.thumbDown : styles.thumbUp]}>
            {negative ? 'Down' : 'Up'}
          </Text>
          <Text style={styles.text}>{rating.text}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <RemoteImage
        uri={rating.avatar}
        width={metrics.ratingAvatarSize}
        height={metrics.ratingAvatarSize}
        borderRadius={radius.pill}
        style={styles.avatar}
      />
      <View style={styles.content}>
        <View style={styles.head}>
          <Text style={styles.name}>{rating.username}</Text>
          <Text style={styles.time}>{formatDateTime(rating.rateTime)}</Text>
        </View>
        <View style={styles.starRow}>
          <Star score={rating.score} size={metrics.ratingStarSize} />
          {rating.deliveryTime ? (
            <Text style={styles.delivery}>{rating.deliveryTime}</Text>
          ) : null}
        </View>
        {rating.text ? <Text style={styles.text}>{rating.text}</Text> : null}
        {rating.recommend.length ? (
          <View style={styles.recommend}>
            <Text style={[styles.thumb, styles.thumbUp]}>Up</Text>
            {rating.recommend.map(item => (
              <Text key={item} style={styles.item}>
                {item}
              </Text>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: space[18],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rowLine,
  },
  avatar: { marginRight: space[12] },
  content: { flex: 1 },
  head: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: space[4] },
  name: { fontSize: fontSize.smallS, color: colors.darkGrey },
  time: { fontSize: fontSize.smallS, color: colors.lightGrey },
  starRow: { flexDirection: 'row', alignItems: 'center', marginBottom: space[6] },
  delivery: { fontSize: fontSize.smallS, color: colors.lightGrey, marginLeft: space[6] },
  text: { fontSize: fontSize.small, lineHeight: lineHeight.body, color: colors.darkGrey },
  textRow: { flexDirection: 'row', marginTop: space[6] },
  recommend: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginTop: space[6] },
  thumb: { fontSize: fontSize.small, marginRight: space[6] },
  thumbUp: { color: colors.blue },
  thumbDown: { color: colors.lightGrey },
  item: {
    fontSize: fontSize.smallS,
    color: colors.lightGrey,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rowLine,
    borderRadius: radius.xs,
    paddingHorizontal: space[6],
    paddingVertical: space[2],
    marginRight: space[8],
    marginBottom: space[4],
  },
  compactRow: {
    paddingVertical: space[16],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rowLine,
  },
  compactHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
  compactName: { fontSize: fontSize.smallS, color: colors.lightGrey, marginRight: space[6] },
});
