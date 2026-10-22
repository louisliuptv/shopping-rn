import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appConfig } from '../../../app/config/appConfig';
import { colors, fontSize } from '../../../app/theme/tokens';
import { formatPrice } from '../../../domain/usecases/cartUseCases';
import { ErrorState, LoadingState } from '../../../shared/ui/AsyncState';
import { RemoteImage } from '../../../shared/ui/RemoteImage';
import { Split } from '../../../shared/ui/Split';
import { Star } from '../../../shared/ui/Star';
import { SupportTag } from '../../../shared/ui/SupportTag';
import { useFavoriteStore } from '../store/favoriteStore';
import { useSeller } from '../hooks/useSeller';

export function SellerScreen() {
  const sellerId = appConfig.sellerId;
  const insets = useSafeAreaInsets();
  const sellerQuery = useSeller(sellerId);
  const favorite = useFavoriteStore(state => Boolean(state.favoriteBySeller[sellerId]));
  const toggleFavorite = useFavoriteStore(state => state.toggle);

  if (sellerQuery.isPending) {
    return <LoadingState label="Loading merchant…" />;
  }

  if (sellerQuery.isError || !sellerQuery.data) {
    return <ErrorState message="Failed to load the merchant" onRetry={() => sellerQuery.refetch()} />;
  }

  const seller = sellerQuery.data;

  return (
    <ScrollView
      style={styles.root}
      testID="seller-screen"
      contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
    >
      <View style={styles.overview}>
        <Text style={styles.title}>{seller.name}</Text>
        <View style={styles.desc}>
          <Star score={seller.score} size={36} />
          <Text style={styles.descText}>({seller.ratingCount})</Text>
          <Text style={styles.descText}>{seller.sellCount} orders</Text>
        </View>
        <View style={styles.remark}>
          <View style={[styles.block, styles.blockDivider]}>
            <Text style={styles.blockTitle}>Min order</Text>
            <Text style={styles.blockContent}>
              ¥<Text style={styles.stress}>{formatPrice(seller.minPrice)}</Text>
            </Text>
          </View>
          <View style={[styles.block, styles.blockDivider]}>
            <Text style={styles.blockTitle}>Delivery fee</Text>
            <Text style={styles.blockContent}>
              ¥<Text style={styles.stress}>{formatPrice(seller.deliveryPrice)}</Text>
            </Text>
          </View>
          <View style={styles.block}>
            <Text style={styles.blockTitle}>Avg. delivery</Text>
            <Text style={styles.blockContent}>
              <Text style={styles.stress}>{seller.deliveryTime}</Text> min
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.favorite}
          onPress={() => toggleFavorite(sellerId)}
          accessibilityRole="switch"
          accessibilityState={{ checked: favorite }}
          testID="seller-favorite"
        >
          <Text style={[styles.favoriteIcon, favorite && styles.favoriteIconActive]}>♥</Text>
          <Text style={styles.favoriteText}>{favorite ? 'Saved' : 'Save'}</Text>
        </Pressable>
      </View>

      <Split />

      <View style={styles.bulletin}>
        <Text style={styles.sectionTitle}>Announcements</Text>
        <Text style={styles.bulletinText}>{seller.bulletin}</Text>
        {seller.supports.map((support, index) => (
          <View key={`${support.type}-${index}`} style={styles.supportItem}>
            <SupportTag support={support} size={4} />
            <Text style={styles.supportText}>{support.description}</Text>
          </View>
        ))}
      </View>

      <Split />

      <View style={styles.pics}>
        <Text style={styles.sectionTitle}>Photos</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {seller.pics.map((pic, index) => (
            <RemoteImage
              key={`${pic}-${index}`}
              uri={pic}
              width={120}
              height={90}
              style={styles.pic}
            />
          ))}
        </ScrollView>
      </View>

      <Split />

      <View style={styles.info}>
        <Text style={styles.sectionTitle}>About</Text>
        {seller.infos.map((info, index) => (
          <Text key={`${info}-${index}`} style={styles.infoItem}>
            {info}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  overview: { padding: 18 },
  title: { fontSize: fontSize.medium, color: colors.darkGrey, marginBottom: 8 },
  desc: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rowLine,
  },
  descText: { fontSize: fontSize.smallS, color: colors.grey, marginLeft: 8 },
  remark: { flexDirection: 'row', paddingTop: 18 },
  block: { flex: 1, alignItems: 'center' },
  blockDivider: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: colors.colLine,
  },
  blockTitle: { fontSize: fontSize.smallS, color: colors.lightGrey, marginBottom: 4 },
  blockContent: { fontSize: fontSize.smallS, color: colors.darkGrey },
  stress: { fontSize: fontSize.largeXXX, color: colors.darkGrey },
  favorite: {
    position: 'absolute',
    right: 11,
    top: 18,
    width: 50,
    alignItems: 'center',
  },
  favoriteIcon: { fontSize: fontSize.largeXXX, color: colors.lightGreyS, marginBottom: 4 },
  favoriteIconActive: { color: colors.red },
  favoriteText: { fontSize: fontSize.smallS, color: colors.grey },
  bulletin: { paddingHorizontal: 18, paddingTop: 18 },
  sectionTitle: { fontSize: fontSize.medium, color: colors.darkGrey, marginBottom: 8 },
  bulletinText: {
    fontSize: fontSize.small,
    lineHeight: 24,
    color: colors.red,
    paddingHorizontal: 12,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rowLine,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rowLine,
  },
  supportText: { fontSize: fontSize.small, color: colors.darkGrey, marginLeft: 6 },
  pics: { padding: 18 },
  pic: { marginRight: 6, borderRadius: 2 },
  info: { paddingHorizontal: 18, paddingTop: 18 },
  infoItem: {
    fontSize: fontSize.small,
    lineHeight: 16,
    color: colors.darkGrey,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rowLine,
  },
});
