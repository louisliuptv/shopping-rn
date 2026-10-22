import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Text, useTheme } from 'react-native-paper';
import { space, metrics } from '../../../app/theme/tokens';
import type { Seller } from '../../../domain/entities/shop';
import { Star } from '../../../shared/ui/Star';

export function RatingOverview({ seller }: { seller: Seller }) {
  const theme = useTheme();

  return (
    <View style={styles.root}>
      <View style={styles.left}>
        <Text variant="displaySmall" style={{ color: theme.colors.tertiary }}>
          {seller.score}
        </Text>
        <Text variant="labelLarge" style={{ color: theme.colors.onSurface }}>
          Overall
        </Text>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          {seller.rankRate}% above nearby
        </Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.right}>
        <View style={styles.wrapper}>
          <Text variant="bodyMedium" style={styles.label}>
            Service
          </Text>
          <Star score={seller.serviceScore} size={metrics.ratingStarSize} />
          <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.tertiary }]}>
            {seller.serviceScore}
          </Text>
        </View>
        <View style={styles.wrapper}>
          <Text variant="bodyMedium" style={styles.label}>
            Food
          </Text>
          <Star score={seller.foodScore} size={metrics.ratingStarSize} />
          <Text variant="bodyMedium" style={[styles.value, { color: theme.colors.tertiary }]}>
            {seller.foodScore}
          </Text>
        </View>
        <View style={styles.wrapper}>
          <Text variant="bodyMedium" style={styles.label}>
            Delivery
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            {seller.deliveryTime}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flexDirection: 'row', paddingVertical: space[18], paddingHorizontal: space[18] },
  left: {
    width: metrics.ratingSummaryWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: { width: 1, height: '80%', alignSelf: 'center', marginHorizontal: space[12] },
  right: { flex: 1 },
  wrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: space[8] },
  label: { flex: 1 },
  value: { fontWeight: '700', marginLeft: space[12] },
});
