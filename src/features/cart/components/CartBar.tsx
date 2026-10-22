import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, fontWeight, space, radius, zIndex, metrics } from '../../../app/theme/tokens';
import { formatPrice, type CartSummary } from '../../../domain/usecases/cartUseCases';
import { Bubble } from '../../../shared/ui/Bubble';
import { useCartBall } from '../animation/CartBall';
import { CartIcon } from './CartIcon';
import { CartPanel } from './CartPanel';
import { PayDialog } from './PayDialog';

interface CartBarProps {
  summary: CartSummary;
  deliveryPrice: number;
  bottomInset: number;
}

export function CartBar({ summary, deliveryPrice, bottomInset }: CartBarProps) {
  const cartBall = useCartBall();
  const [panelOpen, setPanelOpen] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const highlighted = summary.totalCount > 0;

  useEffect(() => {
    if (summary.totalCount === 0) {
      setPanelOpen(false);
    }
  }, [summary.totalCount]);

  const togglePanel = useCallback(() => {
    if (summary.totalCount === 0) {
      return;
    }
    setPanelOpen(open => !open);
  }, [summary.totalCount]);

  const onPay = useCallback(() => {
    if (!summary.payEnabled) {
      return;
    }
    setPayOpen(true);
  }, [summary.payEnabled]);

  const barHeight = metrics.cartBarHeight + bottomInset;

  return (
    <>
      <View style={[styles.bar, { paddingBottom: bottomInset }]} testID="cart-bar">
        <Pressable style={styles.left} onPress={togglePanel} accessibilityLabel="Cart details">
          <View style={styles.logoWrapper} ref={cartBall?.registerTarget}>
            <View style={[styles.logo, highlighted && styles.logoHighlight]}>
              <CartIcon color={highlighted ? colors.white : colors.lightGrey} />
            </View>
            <View style={styles.badge}>
              <Bubble count={summary.totalCount} testID="cart-bar-badge" />
            </View>
          </View>
          <Text style={[styles.price, highlighted && styles.priceHighlight]} testID="cart-bar-price">
            ¥{formatPrice(summary.totalPrice)}
          </Text>
          <Text style={styles.desc}>Delivery ¥{formatPrice(deliveryPrice)}</Text>
        </Pressable>
        <Pressable
          style={[styles.pay, summary.payEnabled ? styles.payEnabled : styles.payDisabled]}
          onPress={onPay}
          accessibilityRole="button"
          testID="cart-bar-pay"
        >
          <Text style={styles.payText}>{summary.payDesc}</Text>
        </Pressable>
      </View>

      <CartPanel
        visible={panelOpen}
        summary={summary}
        onClose={() => setPanelOpen(false)}
        bottomOffset={barHeight}
      />

      <PayDialog
        visible={payOpen}
        title="Pay"
        content={`You need to pay ¥${formatPrice(summary.totalPrice)}`}
        onClose={() => setPayOpen(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: space[0],
    right: space[0],
    bottom: space[0],
    zIndex: zIndex.sticky,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.background,
    paddingTop: space[0],
  },
  left: { flex: 1, flexDirection: 'row', alignItems: 'flex-start' },
  logoWrapper: {
    marginTop: -metrics.cartLogoOverhang,
    marginHorizontal: space[12],
    padding: space[6],
    width: metrics.cartLogoHitArea,
    height: metrics.cartLogoHitArea,
  },
  logo: {
    width: metrics.cartLogoSize,
    height: metrics.cartLogoSize,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkGrey,
  },
  logoHighlight: { backgroundColor: colors.blue },
  badge: { position: 'absolute', top: space[0], right: space[0] },
  price: {
    marginTop: space[12],
    marginRight: space[12],
    fontSize: fontSize.large,
    fontWeight: fontWeight.bold,
    color: colors.lightGrey,
  },
  priceHighlight: { color: colors.white },
  desc: { marginTop: space[14], fontSize: fontSize.smallS, color: colors.lightGrey },
  pay: {
    width: metrics.cartPayWidth,
    height: metrics.cartBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payDisabled: { backgroundColor: colors.darkGrey },
  payEnabled: { backgroundColor: colors.green },
  payText: { fontSize: fontSize.small, fontWeight: fontWeight.bold, color: colors.white },
});
