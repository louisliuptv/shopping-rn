import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CART_BAR_HEIGHT, colors, fontSize } from '../../../app/theme/tokens';
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

  const barHeight = CART_BAR_HEIGHT + bottomInset;

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
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.background,
    paddingTop: 0,
  },
  left: { flex: 1, flexDirection: 'row', alignItems: 'flex-start' },
  logoWrapper: { marginTop: -10, marginHorizontal: 12, padding: 6, width: 56, height: 56 },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkGrey,
  },
  logoHighlight: { backgroundColor: colors.blue },
  badge: { position: 'absolute', top: 0, right: 0 },
  price: {
    marginTop: 12,
    marginRight: 12,
    fontSize: fontSize.large,
    fontWeight: '700',
    color: colors.lightGrey,
  },
  priceHighlight: { color: colors.white },
  desc: { marginTop: 14, fontSize: fontSize.smallS, color: colors.lightGrey },
  pay: { width: 105, height: CART_BAR_HEIGHT, alignItems: 'center', justifyContent: 'center' },
  payDisabled: { backgroundColor: colors.darkGrey },
  payEnabled: { backgroundColor: colors.green },
  payText: { fontSize: fontSize.small, fontWeight: '700', color: colors.white },
});
