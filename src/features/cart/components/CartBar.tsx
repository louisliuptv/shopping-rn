import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Button, Surface, Text, useTheme } from 'react-native-paper';
import { colors, space, metrics } from '../../../app/theme/tokens';
import { formatPrice, type CartSummary } from '../../../domain/usecases/cartUseCases';
import { Bubble } from '../../../shared/ui/Bubble';
import { useCartBall } from '../animation/CartBall';
import { CartPanel } from './CartPanel';
import { PayDialog } from './PayDialog';

interface CartBarProps {
  summary: CartSummary;
  deliveryPrice: number;
  bottomInset: number;
}

export function CartBar({ summary, deliveryPrice, bottomInset }: CartBarProps) {
  const theme = useTheme();
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


  return (
    <>
      <Surface
        style={[styles.bar, { paddingBottom: bottomInset, backgroundColor: theme.colors.surface }]}
        elevation={3}
        testID="cart-bar"
      >
        <Pressable style={styles.left} onPress={togglePanel} accessibilityLabel="Cart details">
          <View style={styles.logoWrapper} ref={cartBall?.registerTarget}>
            <Avatar.Icon
              size={metrics.cartLogoSize}
              icon="cart-outline"
              style={{ backgroundColor: highlighted ? theme.colors.primary : theme.colors.surfaceVariant }}
              color={highlighted ? theme.colors.onPrimary : theme.colors.onSurfaceVariant}
            />
            <View style={styles.badge}>
              <Bubble count={summary.totalCount} testID="cart-bar-badge" />
            </View>
          </View>
          <View style={styles.summary}>
            <Text variant="titleMedium" testID="cart-bar-price">
              ¥{formatPrice(summary.totalPrice)}
            </Text>
            <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
              Delivery ¥{formatPrice(deliveryPrice)}
            </Text>
          </View>
        </Pressable>
        <Button
          mode="contained"
          onPress={onPay}
          disabled={!summary.payEnabled}
          testID="cart-bar-pay"
          style={styles.pay}
          contentStyle={styles.payContent}
          buttonColor={colors.green}
        >
          {summary.payDesc}
        </Button>
      </Surface>

      <CartPanel
        visible={panelOpen}
        summary={summary}
        onClose={() => setPanelOpen(false)}
        bottomOffset={metrics.cartBarHeight}
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
    minHeight: metrics.cartBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: space[8],
  },
  left: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  logoWrapper: { padding: space[6] },
  badge: { position: 'absolute', top: space[8], right: space[4] },
  summary: { paddingLeft: space[4] },
  pay: { marginRight: space[8] },
  payContent: { height: metrics.cartBarHeight - space[12] },
});
