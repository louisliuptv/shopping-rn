import React, { useCallback } from 'react';
import { ImageBackground, Pressable, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Avatar, Icon, Surface, Text, useTheme } from 'react-native-paper';
import { colors, space, metrics } from '../../../app/theme/tokens';
import type { Seller } from '../../../domain/entities/shop';
import { SupportTag } from '../../../shared/ui/SupportTag';

interface SellerHeaderProps {
  seller?: Seller;
  onPress?: () => void;
}

export function SellerHeader({ seller, onPress }: SellerHeaderProps) {
  const theme = useTheme();
  const handlePress = useCallback(() => {
    onPress?.();
  }, [onPress]);

  if (!seller) {
    return (
      <View
        style={[styles.loading, { backgroundColor: theme.colors.inverseSurface }]}
        testID="seller-header-loading"
      >
        <ActivityIndicator color={theme.colors.onPrimary} />
      </View>
    );
  }

  return (
    <Pressable style={styles.root} onPress={handlePress} testID="seller-header">
      <ImageBackground
        source={seller.avatar ? { uri: seller.avatar } : undefined}
        style={StyleSheet.absoluteFill}
        blurRadius={10}
      />
      <View style={[styles.scrim, { backgroundColor: theme.colors.scrim }]} />

      <View style={styles.contentWrapper}>
        <Avatar.Image size={metrics.sellerAvatarSize} source={{ uri: seller.avatar }} style={styles.avatar} />
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Surface elevation={0} style={styles.brand}>
              <Text variant="labelSmall" style={styles.brandText}>
                BRAND
              </Text>
            </Surface>
            <Text variant="titleLarge" numberOfLines={1} style={styles.name}>
              {seller.name}
            </Text>
          </View>
          <Text variant="bodySmall" numberOfLines={1} style={styles.description}>
            {seller.description} · {seller.deliveryTime} min
          </Text>
          {seller.supports.length ? (
            <View style={styles.support}>
              <SupportTag support={seller.supports[0]} size={1} />
              <Text variant="bodySmall" numberOfLines={1} style={styles.supportText}>
                {seller.supports[0].description}
              </Text>
            </View>
          ) : null}
        </View>
        {seller.supports.length ? (
          <Surface elevation={1} style={styles.supportCount}>
            <Text variant="labelSmall">{seller.supports.length} offers</Text>
            <Icon source="chevron-down" size={16} />
          </Surface>
        ) : null}
      </View>

      <View style={styles.bulletin}>
        <Surface elevation={0} style={styles.bulletinBadge}>
          <Text variant="labelSmall" style={styles.bulletinBadgeText}>
            NOTICE
          </Text>
        </Surface>
        <Text variant="bodySmall" numberOfLines={1} style={styles.bulletinText}>
          {seller.bulletin}
        </Text>
        <Icon source="chevron-right" size={18} color={colors.white} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  loading: { height: metrics.sellerHeaderHeight, alignItems: 'center', justifyContent: 'center' },
  root: { overflow: 'hidden' },
  scrim: { ...StyleSheet.absoluteFillObject },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: space[24],
    paddingLeft: space[18],
    paddingRight: space[12],
    paddingBottom: space[18],
  },
  avatar: { marginRight: space[16] },
  content: { flex: 1 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: space[4] },
  brand: { paddingHorizontal: space[4], paddingVertical: space[1], borderRadius: 4, marginRight: space[6] },
  brandText: { color: colors.white, fontWeight: '700' },
  name: { flex: 1, color: colors.white, fontWeight: '700' },
  description: { color: colors.white, marginBottom: space[6] },
  support: { flexDirection: 'row', alignItems: 'center' },
  supportText: { color: colors.white, marginLeft: space[4], flex: 1 },
  supportCount: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space[10],
    height: space[28],
    borderRadius: 14,
  },
  bulletin: {
    flexDirection: 'row',
    alignItems: 'center',
    height: space[32],
    paddingHorizontal: space[12],
    backgroundColor: 'rgba(7, 17, 27, 0.35)',
  },
  bulletinBadge: {
    borderRadius: 2,
    paddingHorizontal: space[4],
    paddingVertical: space[1],
    marginRight: space[6],
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  bulletinBadgeText: { color: colors.white },
  bulletinText: { flex: 1, color: colors.white },
});
