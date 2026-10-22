import React, { useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackScreenProps } from '../../../app/navigation/types';
import { colors, fontSize, lineHeight, fontWeight, space, radius, zIndex } from '../../../app/theme/tokens';
import { formatPrice } from '../../../domain/usecases/cartUseCases';
import { ErrorState, LoadingState } from '../../../shared/ui/AsyncState';
import { RemoteImage } from '../../../shared/ui/RemoteImage';
import { Split } from '../../../shared/ui/Split';
import { CartControl } from '../../cart/components/CartControl';
import { selectFoodCount, useCartStore } from '../../cart/store/cartStore';
import { FoodRatingSection } from '../components/FoodRatingSection';
import { useGoods } from '../hooks/useGoods';

export function FoodDetailScreen({ route, navigation }: RootStackScreenProps<'FoodDetail'>) {
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
    <View style={styles.root} testID="food-detail-screen">
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + space[24] }}>
        <View style={{ width, height: width }}>
          <RemoteImage uri={food.image} width={width} height={width} />
          <Pressable
            onPress={() => navigation.goBack()}
            style={[styles.back, { top: insets.top + space[6] }]}
            hitSlop={space[12]}
            accessibilityRole="button"
            accessibilityLabel="Back"
            testID="food-detail-back"
          >
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{food.name}</Text>
          <View style={styles.detail}>
            <Text style={styles.detailText}>{food.sellCount} sold</Text>
            <Text style={styles.detailText}>{food.rating}% positive</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.price}>¥{formatPrice(food.price)}</Text>
            {food.oldPrice ? <Text style={styles.oldPrice}>¥{food.oldPrice}</Text> : null}
          </View>

          <View style={styles.control}>
            <CartControl foodId={food.id} />
          </View>

          {count === 0 ? (
            <Pressable
              style={styles.buy}
              onPress={() => addFood(food.id)}
              accessibilityRole="button"
              testID="food-detail-buy"
            >
              <Text style={styles.buyText}>Add to cart</Text>
            </Pressable>
          ) : null}
        </View>

        {food.info ? (
          <>
            <Split />
            <View style={styles.info}>
              <Text style={styles.infoTitle}>Details</Text>
              <Text style={styles.infoText}>{food.info}</Text>
            </View>
          </>
        ) : null}

        <Split />
        <FoodRatingSection ratings={food.ratings} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  back: { position: 'absolute', left: space[0], paddingHorizontal: space[10], paddingVertical: space[6] },
  backIcon: { fontSize: fontSize.display, color: colors.white, lineHeight: lineHeight.icon },
  content: { paddingHorizontal: space[18], paddingVertical: space[18] },
  title: { fontSize: fontSize.medium, fontWeight: fontWeight.bold, color: colors.darkGrey, marginBottom: space[8] },
  detail: { flexDirection: 'row', marginBottom: space[18] },
  detailText: { fontSize: fontSize.smallS, color: colors.lightGrey, marginRight: space[12] },
  priceRow: { flexDirection: 'row', alignItems: 'baseline' },
  price: { fontSize: fontSize.medium, fontWeight: fontWeight.bold, color: colors.red, marginRight: space[8] },
  oldPrice: {
    fontSize: fontSize.smallS,
    color: colors.lightGrey,
    textDecorationLine: 'line-through',
  },
  control: { position: 'absolute', right: space[12], bottom: space[12] },
  buy: {
    position: 'absolute',
    right: space[18],
    bottom: space[18],
    zIndex: zIndex.raised,
    height: space[24],
    justifyContent: 'center',
    paddingHorizontal: space[12],
    borderRadius: radius.pill,
    backgroundColor: colors.blue,
  },
  buyText: { fontSize: fontSize.smallS, color: colors.white },
  info: { padding: space[18] },
  infoTitle: { fontSize: fontSize.medium, color: colors.darkGrey, marginBottom: space[6] },
  infoText: { fontSize: fontSize.small, lineHeight: lineHeight.relaxed, color: colors.grey, paddingHorizontal: space[8] },
});
