import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, space, metrics } from '../../../app/theme/tokens';
import type { Seller } from '../../../domain/entities/shop';
import { Star } from '../../../shared/ui/Star';

export function RatingOverview({ seller }: { seller: Seller }) {
  return (
    <View style={styles.root}>
      <View style={styles.left}>
        <Text style={styles.score}>{seller.score}</Text>
        <Text style={styles.title}>Overall</Text>
        <Text style={styles.rank}>{seller.rankRate}% above nearby</Text>
      </View>
      <View style={styles.right}>
        <View style={styles.wrapper}>
          <Text style={styles.label}>Service</Text>
          <Star score={seller.serviceScore} size={metrics.sellerStarSize} />
          <Text style={styles.value}>{seller.serviceScore}</Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.label}>Food</Text>
          <Star score={seller.foodScore} size={metrics.sellerStarSize} />
          <Text style={styles.value}>{seller.foodScore}</Text>
        </View>
        <View style={styles.wrapper}>
          <Text style={styles.label}>Delivery</Text>
          <Text style={styles.delivery}>{seller.deliveryTime} min</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flexDirection: 'row', paddingVertical: space[18] },
  left: {
    width: metrics.ratingSummaryWidth,
    paddingVertical: space[6],
    alignItems: 'center',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: colors.colLine,
  },
  score: { fontSize: fontSize.largeXXX, color: colors.orange, marginBottom: space[6] },
  title: { fontSize: fontSize.small, color: colors.darkGrey, marginBottom: space[8] },
  rank: { fontSize: fontSize.smallS, color: colors.lightGrey },
  right: { flex: 1, paddingVertical: space[6], paddingLeft: space[24] },
  wrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: space[8] },
  label: { fontSize: fontSize.small, color: colors.darkGrey, marginRight: space[12] },
  value: { fontSize: fontSize.small, color: colors.orange, marginLeft: space[12] },
  delivery: { fontSize: fontSize.small, color: colors.lightGrey },
});
