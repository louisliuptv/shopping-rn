import React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { radius } from '../../../app/theme/tokens';

interface PayDialogProps {
  visible: boolean;
  title: string;
  content: string;
  onClose: () => void;
}

export function PayDialog({ visible, title, content, onClose }: PayDialogProps) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose} style={{ borderRadius: radius.l }}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{content}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
