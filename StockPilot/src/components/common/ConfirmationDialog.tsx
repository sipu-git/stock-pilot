import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

interface ConfirmationDialogProps {
  visible: boolean;
  title: string;
  message: string;
  loading?: boolean;
    confirmText?: string;
  onDismiss: () => void;
  onConfirm: () => void;
}

export default function ConfirmationDialog({
  visible,
  title,
  message,
  loading = false,
  confirmText = "Confirm",
  onDismiss,
  onConfirm,
}: ConfirmationDialogProps) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>

        <Dialog.Content>
          <Text>{message}</Text>
        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>

          <Button
            onPress={onConfirm}
            loading={loading}
            disabled={loading}
          >
            {confirmText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}