import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize } from '../../../app/theme/tokens';
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
          <RemoteImage uri={rating.avatar} width={12} height={12} borderRadius={6} />
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
      <RemoteImage uri={rating.avatar} width={28} height={28} borderRadius={14} style={styles.avatar} />
      <View style={styles.content}>
        <View style={styles.head}>
          <Text style={styles.name}>{rating.username}</Text>
          <Text style={styles.time}>{formatDateTime(rating.rateTime)}</Text>
        </View>
        <View style={styles.starRow}>
          <Star score={rating.score} size={24} />
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
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rowLine,
  },
  avatar: { marginRight: 12 },
  content: { flex: 1 },
  head: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  name: { fontSize: fontSize.smallS, color: colors.darkGrey },
  time: { fontSize: fontSize.smallS, color: colors.lightGrey },
  starRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  delivery: { fontSize: fontSize.smallS, color: colors.lightGrey, marginLeft: 6 },
  text: { fontSize: fontSize.small, lineHeight: 18, color: colors.darkGrey },
  textRow: { flexDirection: 'row', marginTop: 6 },
  recommend: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginTop: 6 },
  thumb: { fontSize: fontSize.small, marginRight: 6 },
  thumbUp: { color: colors.blue },
  thumbDown: { color: colors.lightGrey },
  item: {
    fontSize: fontSize.smallS,
    color: colors.lightGrey,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rowLine,
    borderRadius: 1,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
    marginBottom: 4,
  },
  compactRow: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rowLine,
  },
  compactHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
  compactName: { fontSize: fontSize.smallS, color: colors.lightGrey, marginRight: 6 },
});
