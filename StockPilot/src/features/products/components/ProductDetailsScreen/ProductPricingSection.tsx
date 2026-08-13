import React from "react";
import { StyleSheet } from "react-native";

import { Product } from "../../types";
import { useAppTheme } from "../../../../core/theme/useAppTheme";
import { AppCard, AppText } from "../../../../components/ui";
import AppDivider from "../../../../components/ui/AppDivider";
import InfoRow from "./InfoRow";

interface Props {
  product: Product;
}

const formatCurrency = (value?: number | null) => {
  if (value === undefined || value === null) {
    return "-";
  }

  return `₹${Number(value).toFixed(2)}`;
};

const formatPercentage = (value?: number | null) => {
  if (value === undefined || value === null) {
    return "-";
  }

  return `${value}%`;
};

export default function ProductPricingSection({
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
        Pricing
      </AppText>

      <InfoRow
        label="Selling Price"
        value={formatCurrency(product.sellingPrice)}
        valueColor={colors.primary}
      />

      <AppDivider />

      <InfoRow
        label="Purchase Price"
        value={formatCurrency(product.purchasePrice)}
      />

      <AppDivider />

      <InfoRow
        label="Discount"
        value={formatPercentage(product.discount)}
      />

      <AppDivider />

      <InfoRow
        label="Tax"
        value={formatPercentage(product.tax)}
      />

      <AppDivider />

      <InfoRow
        label="Profit / Unit"
        value={formatCurrency(
          (product.sellingPrice ?? 0) -
            (product.purchasePrice ?? 0)
        )}
        valueColor={colors.success}
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
    marginBottom: 12,
    fontWeight: "700",
  },
});