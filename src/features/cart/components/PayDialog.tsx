import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize } from '../../../app/theme/tokens';

interface PayDialogProps {
  visible: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

export function PayDialog({ visible, title, content, onClose }: PayDialogProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.root}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
          <Pressable style={styles.button} onPress={onClose} testID="pay-dialog-confirm">
            <Text style={styles.buttonText}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.backgroundSS },
  card: {
    width: '76%',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingTop: 20,
    paddingHorizontal: 18,
    paddingBottom: 0,
    overflow: 'hidden',
  },
  title: {
    fontSize: fontSize.large,
    fontWeight: '700',
    color: colors.darkGrey,
    textAlign: 'center',
    marginBottom: 12,
  },
  content: {
    fontSize: fontSize.medium,
    color: colors.grey,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rowLine,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: { fontSize: fontSize.large, color: colors.blue },
});
