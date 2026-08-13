import React from "react";
import { StyleSheet } from "react-native";

import { Card, Text } from "react-native-paper";

import { useAppTheme } from "../../../core/theme/useAppTheme";
import { Product } from "../../products/types";

type Props = {
  product: Product;
};

export default function StockSummaryCard({
  product,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
        },
      ]}
    >
      <Card.Content>
        <Text
          variant="titleLarge"
          style={styles.name}
        >
          {product.name}
        </Text>

        <Text
          variant="bodyMedium"
          style={styles.text}
        >
          SKU: {product.sku}
        </Text>

        <Text
  variant="titleMedium"
  style={[
    styles.stock,
    {
      color: colors.primary,
    },
  ]}
>
          Current Stock: {product.currentQuantity}
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 12,
  },

  name: {
    fontWeight: "700",
    marginBottom: 8,
  },

  text: {
    marginBottom: 8,
  },

  stock: {
    fontWeight: "600",
  },
});