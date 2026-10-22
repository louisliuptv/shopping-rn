import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, fontWeight, space, radius } from '../../../app/theme/tokens';

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
    borderRadius: radius.l,
    paddingTop: space[20],
    paddingHorizontal: space[18],
    paddingBottom: space[0],
    overflow: 'hidden',
  },
  title: {
    fontSize: fontSize.large,
    fontWeight: fontWeight.bold,
    color: colors.darkGrey,
    textAlign: 'center',
    marginBottom: space[12],
  },
  content: {
    fontSize: fontSize.medium,
    color: colors.grey,
    textAlign: 'center',
    marginBottom: space[20],
  },
  button: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.rowLine,
    paddingVertical: space[14],
    alignItems: 'center',
  },
  buttonText: { fontSize: fontSize.large, color: colors.blue },
});
