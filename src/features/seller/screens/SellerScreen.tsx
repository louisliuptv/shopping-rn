import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Chip, Divider, Icon, List, Surface, Text, useTheme } from 'react-native-paper';
import { appConfig } from '../../../app/config/appConfig';
import { colors, space, metrics } from '../../../app/theme/tokens';
import { formatPrice } from '../../../domain/usecases/cartUseCases';
import { ErrorState, LoadingState } from '../../../shared/ui/AsyncState';
import { RemoteImage } from '../../../shared/ui/RemoteImage';
import { Star } from '../../../shared/ui/Star';
import { useFavoriteStore } from '../store/favoriteStore';
import { useSeller } from '../hooks/useSeller';

export function SellerScreen() {
  const theme = useTheme();
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
      contentContainerStyle={{ paddingBottom: insets.bottom + space[24] }}
    >
      <View style={styles.overview}>
        <Text variant="titleMedium" style={styles.title}>
          {seller.name}
        </Text>
        <View style={styles.desc}>
          <Star score={seller.score} size={metrics.sellerStarSize} />
          <Text variant="bodySmall" style={styles.descText}>
            ({seller.ratingCount})
          </Text>
          <Text variant="bodySmall" style={styles.descText}>
            {seller.sellCount} orders
          </Text>
        </View>
        <View style={styles.remark}>
          <Surface elevation={1} style={styles.block}>
            <Text variant="labelSmall" style={styles.blockTitle}>
              Min order
            </Text>
            <Text variant="titleMedium" style={styles.blockContent}>
              ¥{formatPrice(seller.minPrice)}
            </Text>
          </Surface>
          <Surface elevation={1} style={styles.block}>
            <Text variant="labelSmall" style={styles.blockTitle}>
              Delivery fee
            </Text>
            <Text variant="titleMedium" style={styles.blockContent}>
              ¥{formatPrice(seller.deliveryPrice)}
            </Text>
          </Surface>
          <Surface elevation={1} style={styles.block}>
            <Text variant="labelSmall" style={styles.blockTitle}>
              Avg. delivery
            </Text>
            <Text variant="titleMedium" style={styles.blockContent}>
              {seller.deliveryTime} min
            </Text>
          </Surface>
        </View>
        <Button
          mode={favorite ? 'contained' : 'outlined'}
          icon={favorite ? 'heart' : 'heart-outline'}
          onPress={() => toggleFavorite(sellerId)}
          testID="seller-favorite"
          style={styles.favorite}
        >
          {favorite ? 'Saved' : 'Save'}
        </Button>
      </View>

      <Divider />

      <View style={styles.section}>
        <Text variant="titleSmall" style={styles.sectionTitle}>
          Announcements
        </Text>
        <Text variant="bodyMedium" style={[styles.bulletinText, { color: theme.colors.error }]}>
          {seller.bulletin}
        </Text>
        <View style={styles.chips}>
          {seller.supports.map((support, index) => (
            <Chip key={`${support.type}-${index}`} compact icon="ticket-percent-outline" style={styles.chip}>
              {support.description}
            </Chip>
          ))}
        </View>
      </View>

      <Divider />

      <View style={styles.section}>
        <Text variant="titleSmall" style={styles.sectionTitle}>
          Photos
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {seller.pics.map((pic, index) => (
            <RemoteImage
              key={`${pic}-${index}`}
              uri={pic}
              width={metrics.sellerPhotoWidth}
              height={metrics.sellerPhotoHeight}
              borderRadius={8}
              style={styles.pic}
            />
          ))}
        </ScrollView>
      </View>

      <Divider />

      <List.Section>
        <List.Subheader>About</List.Subheader>
        {seller.infos.map((info, index) => (
          <React.Fragment key={`${info}-${index}`}>
            <List.Item title={info} titleNumberOfLines={3} left={props => <List.Icon {...props} icon="store-outline" />} />
            {index < seller.infos.length - 1 ? <Divider /> : null}
          </React.Fragment>
        ))}
      </List.Section>

      <View style={styles.footer}>
        <Icon source="map-marker-outline" size={18} color={colors.lightGrey} />
        <Text variant="bodySmall" style={{ color: colors.lightGrey }}>
          {seller.description}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  overview: { padding: space[18] },
  title: { marginBottom: space[8] },
  desc: { flexDirection: 'row', alignItems: 'center', paddingBottom: space[18] },
  descText: { marginLeft: space[8] },
  remark: { flexDirection: 'row', marginBottom: space[18] },
  block: { flex: 1, marginRight: space[8], padding: space[12], borderRadius: 12 },
  blockTitle: { marginBottom: space[4] },
  blockContent: { fontWeight: '700' },
  favorite: { alignSelf: 'flex-start' },
  section: { paddingHorizontal: space[18], paddingVertical: space[16] },
  sectionTitle: { marginBottom: space[8] },
  bulletinText: { marginBottom: space[12] },
  chips: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: { marginRight: space[6], marginBottom: space[6] },
  pic: { marginRight: space[8] },
  footer: { flexDirection: 'row', alignItems: 'center', padding: space[18] },
});
