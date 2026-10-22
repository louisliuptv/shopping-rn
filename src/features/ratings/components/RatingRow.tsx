import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Chip, Divider, Text, useTheme } from 'react-native-paper';
import { space, metrics, fontSize } from '../../../app/theme/tokens';
import type { Rating } from '../../../domain/entities/shop';
import { formatDateTime } from '../../../domain/usecases/cartUseCases';
import { NEGATIVE_RATETYPE } from '../../../domain/usecases/ratingUseCases';
import { Star } from '../../../shared/ui/Star';

interface RatingRowProps {
  rating: Rating;
  compact?: boolean;
}

export function RatingRow({ rating, compact = false }: RatingRowProps) {
  const theme = useTheme();
  const negative = rating.rateType === NEGATIVE_RATETYPE;

  if (compact) {
    return (
      <View style={styles.compactRow}>
        <View style={styles.compactHead}>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            {rating.username}
          </Text>
          <Avatar.Image size={metrics.ratingAvatarSmallSize} source={{ uri: rating.avatar }} />
        </View>
        <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
          {formatDateTime(rating.rateTime)}
        </Text>
        <View style={styles.textRow}>
          <Text variant="bodyMedium" style={{ color: negative ? theme.colors.error : theme.colors.primary }}>
            {negative ? 'Down' : 'Up'}
          </Text>
          <Text variant="bodyMedium" style={styles.text}>
            {rating.text}
          </Text>
        </View>
        <Divider />
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <Avatar.Image size={metrics.ratingAvatarSize} source={{ uri: rating.avatar }} style={styles.avatar} />
      <View style={styles.content}>
        <View style={styles.head}>
          <Text variant="labelLarge" style={{ color: theme.colors.onSurface }}>
            {rating.username}
          </Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
            {formatDateTime(rating.rateTime)}
          </Text>
        </View>
        <View style={styles.starRow}>
          <Star score={rating.score} size={metrics.ratingStarSize} />
          {rating.deliveryTime ? (
            <Text variant="bodySmall" style={[styles.delivery, { color: theme.colors.onSurfaceVariant }]}>
              {rating.deliveryTime}
            </Text>
          ) : null}
        </View>
        {rating.text ? <Text variant="bodyMedium" style={styles.text}>{rating.text}</Text> : null}
        {rating.recommend.length ? (
          <View style={styles.recommend}>
            {rating.recommend.map(item => (
              <Chip key={item} compact style={styles.chip} textStyle={styles.chipText}>
                {item}
              </Chip>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', paddingVertical: space[16] },
  avatar: { marginRight: space[12] },
  content: { flex: 1 },
  head: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: space[4] },
  starRow: { flexDirection: 'row', alignItems: 'center', marginBottom: space[6] },
  delivery: { marginLeft: space[6] },
  text: { marginTop: space[4] },
  textRow: { flexDirection: 'row', marginTop: space[6] },
  recommend: { flexDirection: 'row', flexWrap: 'wrap', marginTop: space[6] },
  chip: { marginRight: space[6], marginBottom: space[4] },
  chipText: { fontSize: fontSize.label },
  compactRow: {
    paddingVertical: space[16],
    borderBottomWidth: 0,
  },
  compactHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
});
