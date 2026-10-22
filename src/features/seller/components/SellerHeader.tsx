import React, { useCallback } from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, fontSize, fontWeight, space, radius, metrics } from '../../../app/theme/tokens';
import type { Seller } from '../../../domain/entities/shop';
import { RemoteImage } from '../../../shared/ui/RemoteImage';
import { SupportTag } from '../../../shared/ui/SupportTag';

interface SellerHeaderProps {
  seller?: Seller;
  onPress?: () => void;
}

export function SellerHeader({ seller, onPress }: SellerHeaderProps) {
  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  if (!seller) {
    return <View style={styles.loading} testID="seller-header-loading" />;
  }

  return (
    <Pressable style={styles.root} onPress={handlePress} testID="seller-header">
      <ImageBackground
        source={seller.avatar ? { uri: seller.avatar } : undefined}
        style={StyleSheet.absoluteFill}
        blurRadius={10}
      />
      <View style={styles.scrim} />

      <View style={styles.contentWrapper}>
        <RemoteImage
          uri={seller.avatar}
          width={metrics.sellerAvatarSize}
          height={metrics.sellerAvatarSize}
          borderRadius={radius.s}
          style={styles.avatar}
        />
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.brand}>
              <Text style={styles.brandText}>BRAND</Text>
            </View>
            <Text style={styles.name} numberOfLines={1}>
              {seller.name}
            </Text>
          </View>
          <Text style={styles.description} numberOfLines={1}>
            {seller.description} · {seller.deliveryTime} min
          </Text>
          {seller.supports.length ? (
            <View style={styles.support}>
              <SupportTag support={seller.supports[0]} size={1} />
              <Text style={styles.supportText} numberOfLines={1}>
                {seller.supports[0].description}
              </Text>
            </View>
          ) : null}
        </View>
        {seller.supports.length ? (
          <View style={styles.supportCount}>
            <Text style={styles.supportCountText}>{seller.supports.length} offers</Text>
            <Text style={styles.chevron}>›</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.bulletin}>
        <View style={styles.bulletinBadge}>
          <Text style={styles.bulletinBadgeText}>NOTICE</Text>
        </View>
        <Text style={styles.bulletinText} numberOfLines={1}>
          {seller.bulletin}
        </Text>
        <Text style={styles.chevron}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  loading: { height: metrics.sellerHeaderHeight, backgroundColor: colors.background },
  root: { overflow: 'hidden', backgroundColor: colors.backgroundSS },
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.backgroundSS },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: space[24],
    paddingLeft: space[24],
    paddingRight: space[12],
    paddingBottom: space[18],
  },
  avatar: { marginRight: space[16] },
  content: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: space[8] },
  brand: {
    paddingHorizontal: space[4],
    paddingVertical: space[1],
    borderRadius: radius.s,
    backgroundColor: colors.red,
    marginRight: space[6],
  },
  brandText: { fontSize: fontSize.smallS, color: colors.white, fontWeight: fontWeight.bold },
  name: { flex: 1, fontSize: fontSize.large, fontWeight: fontWeight.bold, color: colors.white },
  description: { fontSize: fontSize.small, color: colors.white, marginBottom: space[8] },
  support: { flexDirection: 'row', alignItems: 'center' },
  supportText: { fontSize: fontSize.smallS, color: colors.white, marginLeft: space[4] },
  supportCount: {
    position: 'absolute',
    right: space[12],
    bottom: space[14],
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space[8],
    height: space[24],
    borderRadius: radius.pill,
    backgroundColor: colors.backgroundSSS,
  },
  supportCountText: { fontSize: fontSize.smallS, color: colors.white },
  chevron: { fontSize: fontSize.smallS, color: colors.white, marginLeft: space[2] },
  bulletin: {
    flexDirection: 'row',
    alignItems: 'center',
    height: space[28],
    paddingHorizontal: space[8],
    backgroundColor: colors.backgroundSSS,
  },
  bulletinBadge: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.white,
    borderRadius: radius.s,
    paddingHorizontal: space[3],
    marginRight: space[6],
  },
  bulletinBadgeText: { fontSize: fontSize.micro, color: colors.white },
  bulletinText: { flex: 1, fontSize: fontSize.smallS, color: colors.white },
});
