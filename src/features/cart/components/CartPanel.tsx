import React from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize } from '../../../app/theme/tokens';
import { formatPrice } from '../../../domain/usecases/cartUseCases';
import type { CartSummary } from '../../../domain/usecases/cartUseCases';
import { CartControl } from './CartControl';

interface CartPanelProps {
  visible: boolean;
  summary: CartSummary;
  onClose: () => void;
  bottomOffset: number;
}

export function CartPanel({ visible, summary, onClose, bottomOffset }: CartPanelProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.root}>
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
          accessibilityLabel="Close cart"
          testID="cart-panel-backdrop"
        />
        <View style={[styles.panel, { paddingBottom: bottomOffset }]}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Cart</Text>
            <Pressable onPress={onClose} hitSlop={8}>
              <Text style={styles.clear}>Close</Text>
            </Pressable>
          </View>
          <FlatList
            data={summary.entries}
            keyExtractor={item => item.food.id}
            style={styles.list}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.name} numberOfLines={1}>
                  {item.food.name}
                </Text>
                <Text style={styles.price}>¥{formatPrice(item.food.price * item.count)}</Text>
                <CartControl foodId={item.food.id} />
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}

function ItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: colors.backgroundSS },
  panel: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    maxHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rowLine,
  },
  headerText: { fontSize: fontSize.medium, color: colors.darkGrey, fontWeight: '600' },
  clear: { fontSize: fontSize.small, color: colors.blue },
  list: { flexGrow: 0 },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.rowLine,
    marginLeft: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  name: { flex: 1, fontSize: fontSize.medium, color: colors.darkGrey, marginRight: 8 },
  price: {
    fontSize: fontSize.medium,
    color: colors.red,
    fontWeight: '700',
    marginRight: 12,
  },
});
