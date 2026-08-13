import React from "react";
import { StyleSheet } from "react-native";


import InfoRow from "./InfoRow";
import { Product } from "../../types";
import { useAppTheme } from "../../../../core/theme/useAppTheme";
import { AppCard, AppText } from "../../../../components/ui";
import AppDivider from "../../../../components/ui/AppDivider";

interface Props {
  product: Product;
}

export default function ProductInfoSection({
  product,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <AppCard style={styles.card}>
      <AppText
        variant="titleMedium"
        style={[
          styles.heading,
          {
            color: colors.onSurface,
          },
        ]}
      >
        Product Information
      </AppText>

      <InfoRow
        label="Product Name"
        value={product.name}
      />

      <AppDivider />

      <InfoRow
        label="SKU"
        value={product.sku}
      />

      <AppDivider />

      <InfoRow
        label="Category"
        value={product.categoryName ?? "-"}
      />

      <AppDivider />

      <InfoRow
        label="Status"
        value={product.status.replaceAll("_", " ")}
        valueColor={
          product.status === "ACTIVE"
            ? colors.success
            : product.status === "LOW_STOCK"
            ? colors.warning
            : product.status === "OUT_OF_STOCK"
            ? colors.error
            : colors.outline
        }
      />

      <AppDivider />

      <InfoRow
        label="Description"
        value={
          product.description?.trim()
            ? product.description
            : "No description available"
        }
      />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 16,
  },

  heading: {
    fontWeight: "700",
    marginBottom: 12,
  },
});