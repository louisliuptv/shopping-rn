import React, { useMemo } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { appConfig } from '../../../app/config/appConfig';
import { colors, space } from '../../../app/theme/tokens';
import { countRatings, filterRatings } from '../../../domain/usecases/ratingUseCases';
import { EmptyState, ErrorState, LoadingState } from '../../../shared/ui/AsyncState';
import { Split } from '../../../shared/ui/Split';
import { useSeller } from '../../seller/hooks/useSeller';
import { RatingFilter } from '../components/RatingFilter';
import { RatingOverview } from '../components/RatingOverview';
import { RatingRow } from '../components/RatingRow';
import { useRatings } from '../hooks/useRatings';
import { useRatingFilter } from '../hooks/useRatingFilter';

export function RatingsScreen() {
  const sellerId = appConfig.sellerId;
  const ratingsQuery = useRatings(sellerId);
  const sellerQuery = useSeller(sellerId);
  const { filter, setFilter, onlyContent, toggleOnlyContent } = useRatingFilter();

  const ratings = useMemo(() => ratingsQuery.data ?? [], [ratingsQuery.data]);
  const counts = useMemo(() => countRatings(ratings), [ratings]);
  const visible = useMemo(
    () => filterRatings(ratings, filter, onlyContent),
    [ratings, filter, onlyContent],
  );

  if (ratingsQuery.isPending || sellerQuery.isPending) {
    return <LoadingState label="Loading reviews…" />;
  }

  if (ratingsQuery.isError || !sellerQuery.data) {
    return (
      <ErrorState
        message="Failed to load reviews"
        onRetry={() => {
          ratingsQuery.refetch();
          sellerQuery.refetch();
        }}
      />
    );
  }

  return (
    <FlatList
      style={styles.root}
      testID="ratings-screen"
      data={visible}
      keyExtractor={(item, index) => `${item.username}-${item.rateTime}-${index}`}
      renderItem={({ item }) => <RatingRow rating={item} />}
      ListHeaderComponent={
        <View>
          <RatingOverview seller={sellerQuery.data} />
          <Split />
          <RatingFilter
            filter={filter}
            counts={counts}
            onlyContent={onlyContent}
            onChangeFilter={setFilter}
            onToggleOnlyContent={toggleOnlyContent}
          />
        </View>
      }
      ListEmptyComponent={<EmptyState message="No matching reviews" />}
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  content: { paddingHorizontal: space[18] },
});
