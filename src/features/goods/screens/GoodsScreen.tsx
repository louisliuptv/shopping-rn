import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  View,
  type ViewToken,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appConfig } from '../../../app/config/appConfig';
import type { RootStackParamList } from '../../../app/navigation/types';
import { colors, fontSize, space, borderWidth, metrics } from '../../../app/theme/tokens';
import type { Food } from '../../../domain/entities/shop';
import { countByGroup } from '../../../domain/usecases/cartUseCases';
import { ErrorState, LoadingState } from '../../../shared/ui/AsyncState';
import { CartBallProvider } from '../../cart/animation/CartBall';
import { CartBar } from '../../cart/components/CartBar';
import { useCartSummary } from '../../cart/hooks/useCartSummary';
import { useCartStore } from '../../cart/store/cartStore';
import { useSeller } from '../../seller/hooks/useSeller';
import { CategoryNav } from '../components/CategoryNav';
import { FoodRow } from '../components/FoodRow';
import { useGoods } from '../hooks/useGoods';

interface GoodsSection {
  key: string;
  title: string;
  type: number;
  data: Food[];
}

export function GoodsScreen() {
  const sellerId = appConfig.sellerId;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const insets = useSafeAreaInsets();

  const goodsQuery = useGoods(sellerId);
  const sellerQuery = useSeller(sellerId);
  const counts = useCartStore(state => state.counts);

  const goods = useMemo(() => goodsQuery.data ?? [], [goodsQuery.data]);
  const seller = sellerQuery.data;
  const summary = useCartSummary(goods, seller?.minPrice ?? 0);
  const countsByGroup = useMemo(() => countByGroup(goods, counts), [goods, counts]);

  const sections = useMemo<GoodsSection[]>(
    () =>
      goods.map((group, index) => ({
        key: String(index),
        title: group.name,
        type: group.type,
        data: group.foods,
      })),
    [goods],
  );

  const listRef = useRef<SectionList<Food, GoodsSection>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const programmaticUntil = useRef(0);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 20,
    minimumViewTime: 50,
  }).current;

  const onViewableItemsChanged = useRef(
    (info: { viewableItems: ViewToken[] }) => {
      if (Date.now() < programmaticUntil.current) {
        return;
      }
      const first = info.viewableItems.find(token => token.isViewable && token.section);
      const key = first?.section?.key;
      if (key === undefined) {
        return;
      }
      const index = Number(key);
      if (!Number.isNaN(index)) {
        setActiveIndex(index);
      }
    },
  ).current;

  const scrollToGroup = useCallback(
    (index: number) => {
      setActiveIndex(index);
      programmaticUntil.current = Date.now() + 400;
      try {
        listRef.current?.scrollToLocation({
          sectionIndex: index,
          itemIndex: 0,
          animated: true,
          viewPosition: 0,
        });
      } catch {
      }
    },
    [],
  );

  const openFood = useCallback(
    (food: Food) => {
      navigation.navigate('FoodDetail', { sellerId, foodId: food.id });
    },
    [navigation, sellerId],
  );

  if (goodsQuery.isPending) {
    return <LoadingState label="Loading menu…" />;
  }

  if (goodsQuery.isError) {
    return (
      <ErrorState
        message={goodsQuery.error instanceof Error ? goodsQuery.error.message : 'Failed to load the menu'}
        onRetry={() => goodsQuery.refetch()}
      />
    );
  }

  return (
    <View style={styles.root} testID="goods-screen">
      <CartBallProvider>
        <View style={styles.body}>
          <CategoryNav
            groups={goods}
            countsByGroup={countsByGroup}
            activeIndex={activeIndex}
            onSelect={scrollToGroup}
          />
          <SectionList
            ref={listRef}
            style={styles.list}
            sections={sections}
            keyExtractor={item => item.id}
            stickySectionHeadersEnabled
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            contentContainerStyle={{ paddingBottom: metrics.cartBarHeight + insets.bottom + space[12] }}
            renderSectionHeader={({ section }) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
            )}
            renderItem={({ item }) => <FoodRow food={item} onPress={openFood} />}
          />
        </View>

        <CartBar
          summary={summary}
          deliveryPrice={seller?.deliveryPrice ?? 0}
          bottomInset={insets.bottom}
        />
      </CartBallProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  body: { flex: 1, flexDirection: 'row' },
  list: { flex: 1, backgroundColor: colors.white },
  sectionHeader: {
    height: metrics.sectionHeaderHeight,
    justifyContent: 'center',
    paddingLeft: space[14],
    borderLeftWidth: borderWidth.thick,
    borderLeftColor: colors.colLine,
    backgroundColor: colors.backgroundSSSS,
  },
  sectionTitle: { fontSize: fontSize.small, color: colors.grey },
});
