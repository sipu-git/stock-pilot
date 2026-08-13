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

export default function ProductInventorySection({
  product,
}: Props) {
  const { colors } = useAppTheme();

  const getQuantityColor = () => {
    if (product.currentQuantity <= 0) {
      return colors.error;
    }

    if (product.currentQuantity <= product.minimumQuantity) {
      return colors.warning;
    }

    return colors.success;
  };

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
        Inventory
      </AppText>

      <InfoRow
        label="Current Quantity"
        value={product.currentQuantity}
        valueColor={getQuantityColor()}
      />

      <AppDivider />

      <InfoRow
  label="Minimum Quantity"
  value={product.minimumQuantity}
/>

<AppDivider />

<InfoRow
  label="Maximum Quantity"
  value={product.maximumQuantity}
/>

      <AppDivider />

      <InfoRow
        label="Stock Status"
        value={product.status.replace(/_/g, " ")}
        valueColor={getQuantityColor()}
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