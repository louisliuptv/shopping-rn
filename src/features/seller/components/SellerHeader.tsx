import React, { useCallback } from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, fontSize } from '../../../app/theme/tokens';
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
        <RemoteImage uri={seller.avatar} width={64} height={64} borderRadius={2} style={styles.avatar} />
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
  loading: { height: 136, backgroundColor: colors.background },
  root: { overflow: 'hidden', backgroundColor: colors.backgroundSS },
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.backgroundSS },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 12,
    paddingBottom: 18,
  },
  avatar: { marginRight: 16 },
  content: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  brand: {
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
    backgroundColor: colors.red,
    marginRight: 6,
  },
  brandText: { fontSize: fontSize.smallS, color: colors.white, fontWeight: '700' },
  name: { flex: 1, fontSize: fontSize.large, fontWeight: 'bold', color: colors.white },
  description: { fontSize: fontSize.small, color: colors.white, marginBottom: 8 },
  support: { flexDirection: 'row', alignItems: 'center' },
  supportText: { fontSize: fontSize.smallS, color: colors.white, marginLeft: 4 },
  supportCount: {
    position: 'absolute',
    right: 12,
    bottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    height: 24,
    borderRadius: 14,
    backgroundColor: colors.backgroundSSS,
  },
  supportCountText: { fontSize: fontSize.smallS, color: colors.white },
  chevron: { fontSize: fontSize.smallS, color: colors.white, marginLeft: 2 },
  bulletin: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 28,
    paddingHorizontal: 8,
    backgroundColor: colors.backgroundSSS,
  },
  bulletinBadge: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.white,
    borderRadius: 2,
    paddingHorizontal: 3,
    marginRight: 6,
  },
  bulletinBadgeText: { fontSize: 9, color: colors.white },
  bulletinText: { flex: 1, fontSize: fontSize.smallS, color: colors.white },
});
