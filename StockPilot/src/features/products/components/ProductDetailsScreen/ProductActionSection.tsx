import React from "react";
import { StyleSheet, View } from "react-native";

import { Button, Surface, Text } from "react-native-paper";

import { useAppTheme } from "../../../../core/theme/useAppTheme";

type Props = {
  onEditPress: () => void;
  onUpdateStockPress: () => void;
};

export default function ProductActionSection({
  onEditPress,
  onUpdateStockPress,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <Surface
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
        },
      ]}
      elevation={1}
    >
      <Text
        variant="titleMedium"
        style={styles.title}
      >
        Actions
      </Text>

      <Button
        mode="contained"
        icon="pencil"
        style={styles.button}
        onPress={onEditPress}
      >
        Edit Product
      </Button>

      <Button
        mode="contained-tonal"
        icon="package-variant"
        style={styles.button}
        onPress={onUpdateStockPress}
      >
        Update Stock
      </Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
  },

  title: {
    marginBottom: 16,
    fontWeight: "700",
  },

  button: {
    marginBottom: 12,
  },
});