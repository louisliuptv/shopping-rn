import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Divider, List, Modal, Surface, Text, useTheme } from 'react-native-paper';
import { space } from '../../../app/theme/tokens';
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
  const theme = useTheme();

  return (
    <Modal
      visible={visible}
      onDismiss={onClose}
      style={styles.wrapper}
      contentContainerStyle={{ marginBottom: bottomOffset }}
    >
      <Surface elevation={1} style={styles.surface}>
        <View style={styles.header}>
          <Text variant="titleMedium">Cart</Text>
          <Button compact onPress={onClose}>
            Close
          </Button>
        </View>
        <Divider />
        <FlatList
          data={summary.entries}
          keyExtractor={item => item.food.id}
          style={styles.list}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <List.Item
              title={item.food.name}
              titleStyle={{ color: theme.colors.onSurface }}
              description={`¥${formatPrice(item.food.price * item.count)}`}
              descriptionStyle={{ color: theme.colors.primary }}
              right={() => <CartControl foodId={item.food.id} />}
              style={styles.row}
            />
          )}
        />
      </Surface>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: { justifyContent: 'flex-end' },
  surface: { borderTopLeftRadius: 16, borderTopRightRadius: 16, overflow: 'hidden' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: space[18],
    paddingRight: space[8],
    paddingVertical: space[6],
  },
  list: { flexGrow: 0 },
  row: { paddingHorizontal: space[18] },
});
