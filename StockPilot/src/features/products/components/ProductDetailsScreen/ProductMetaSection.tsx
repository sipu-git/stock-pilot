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

const formatDate = (date?: string | Date | null) => {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function ProductMetaSection({
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
        Additional Information
      </AppText>

      <InfoRow
        label="Product ID"
        value={product.id}
      />

      <AppDivider />

      <InfoRow
        label="Created At"
        value={formatDate(product.createdAt)}
      />

      <AppDivider />

      <InfoRow
        label="Last Updated"
        value={formatDate(product.updatedAt)}
      />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 24,
  },

  heading: {
    fontWeight: "700",
    marginBottom: 12,
  },
});