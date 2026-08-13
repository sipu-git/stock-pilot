import React from "react";
import { StyleSheet } from "react-native";

import {
  RadioButton,
  Surface,
  Text,
} from "react-native-paper";

import { useAppTheme } from "../../../core/theme/useAppTheme";
import { StockOperation } from "../types";

type Props = {
  value: StockOperation;
  onChange: (value: StockOperation) => void;
};

export default function StockTypeSelector({
  value,
  onChange,
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
        Stock Operation
      </Text>

      <RadioButton.Group
        onValueChange={(v) =>
          onChange(v as StockOperation)
        }
        value={value}
      >
        <RadioButton.Item
          label="Stock In"
          value="STOCK_IN"
        />

        <RadioButton.Item
          label="Stock Out"
          value="STOCK_OUT"
        />
      </RadioButton.Group>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },

  title: {
    fontWeight: "700",
    marginBottom: 8,
  },
});