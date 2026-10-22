import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Divider, IconButton, Surface, Text, useTheme } from 'react-native-paper';
import type { RootStackScreenProps } from '../../../app/navigation/types';
import { space } from '../../../app/theme/tokens';
import { formatPrice } from '../../../domain/usecases/cartUseCases';
import { ErrorState, LoadingState } from '../../../shared/ui/AsyncState';
import { RemoteImage } from '../../../shared/ui/RemoteImage';
import { CartControl } from '../../cart/components/CartControl';
import { selectFoodCount, useCartStore } from '../../cart/store/cartStore';
import { FoodRatingSection } from '../components/FoodRatingSection';
import { useGoods } from '../hooks/useGoods';

export function FoodDetailScreen({ route, navigation }: RootStackScreenProps<'FoodDetail'>) {
  const theme = useTheme();
  const { sellerId, foodId } = route.params;
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const goodsQuery = useGoods(sellerId);
  const count = useCartStore(selectFoodCount(foodId));
  const addFood = useCartStore(state => state.add);

  const food = useMemo(
    () => goodsQuery.data?.flatMap(group => group.foods).find(item => item.id === foodId),
    [goodsQuery.data, foodId],
  );

  if (goodsQuery.isPending) {
    return <LoadingState label="Loading item…" />;
  }

  if (goodsQuery.isError || !food) {
    return <ErrorState message="This item is unavailable" onRetry={() => goodsQuery.refetch()} />;
  }

  return (
    <View style={[styles.root, { backgroundColor: theme.colors.background }]} testID="food-detail-screen">
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + space[24] }}>
        <View style={{ width, height: width }}>
          <RemoteImage uri={food.image} width={width} height={width} />
          <Surface elevation={2} style={[styles.back, { top: insets.top + space[6] }]}>
            <IconButton
              icon="arrow-left"
              size={22}
              onPress={() => navigation.goBack()}
              testID="food-detail-back"
              accessibilityLabel="Back"
            />
          </Surface>
        </View>

        <Surface elevation={0} style={styles.content}>
          <Text variant="headlineSmall">{food.name}</Text>
          <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant, marginTop: space[4] }}>
            {food.sellCount} sold · {food.rating}% positive
          </Text>
          <View style={styles.priceRow}>
            <Text variant="headlineSmall" style={{ color: theme.colors.error }}>
              ¥{formatPrice(food.price)}
            </Text>
            {food.oldPrice ? (
              <Text
                variant="bodyMedium"
                style={[styles.oldPrice, { color: theme.colors.onSurfaceVariant }]}
              >
                ¥{food.oldPrice}
              </Text>
            ) : null}
            <View style={styles.control}>
              <CartControl foodId={food.id} />
            </View>
          </View>

          {count === 0 ? (
            <Button
              mode="contained"
              icon="cart-plus"
              onPress={() => addFood(food.id)}
              style={styles.buy}
              contentStyle={styles.buyContent}
              testID="food-detail-buy"
            >
              Add to cart
            </Button>
          ) : null}
        </Surface>

        <Divider />

        {food.info ? (
          <>
            <View style={styles.info}>
              <Text variant="titleMedium">Details</Text>
              <Text variant="bodyMedium" style={[styles.infoText, { color: theme.colors.onSurfaceVariant }]}>
                {food.info}
              </Text>
            </View>
            <Divider />
          </>
        ) : null}

        <FoodRatingSection ratings={food.ratings} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  back: { position: 'absolute', left: space[8], borderRadius: 24 },
  content: { paddingHorizontal: space[18], paddingVertical: space[18] },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginTop: space[8] },
  oldPrice: { marginLeft: space[8], textDecorationLine: 'line-through' },
  control: { marginLeft: 'auto' },
  buy: { marginTop: space[16] },
  buyContent: { height: 48 },
  info: { padding: space[18] },
  infoText: { marginTop: space[8] },
});
