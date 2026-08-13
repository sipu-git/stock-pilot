import React from "react";
import { Snackbar } from "react-native-paper";

interface Props {
  visible: boolean;
  message: string;
  type: "success" | "error" | "info";
  onDismiss: () => void;
}

export function AppSnackbar({
  visible,
  message,
  type,
  onDismiss,
}: Props) {
  const backgroundColor = {
    success: "#16A34A",
    error: "#DC2626",
    info: "#2563EB",
  }[type];

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      duration={2500}
      style={{
        backgroundColor,
      }}
      action={{
        label: "Close",
        textColor: "#fff",
        onPress: onDismiss,
      }}
    >
      {message}
    </Snackbar>
  );
}