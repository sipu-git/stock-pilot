import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useAppTheme } from "../../../core/theme/useAppTheme";
import { AppCard, AppText } from "../../../components/ui";
import { ProductReport } from "../types";


interface Props {
  product: ProductReport;
}

export default function ProductReportCard({
  product,
}: Props) {
  const { colors } = useAppTheme();

  const statusColor =
    product.status === "ACTIVE"
      ? colors.success
      : product.status === "LOW_STOCK"
      ? colors.warning
      : colors.error;

  return (
    <AppCard style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="package-variant"
          size={28}
          color={colors.primary}
        />

        <View style={styles.headerContent}>
          <AppText variant="titleLarge">
            {product.name}
          </AppText>

          <AppText
            variant="bodySmall"
            color="secondary"
          >
            SKU: {product.sku}
          </AppText>

          <AppText
            variant="bodySmall"
            color="secondary"
          >
            {product.category_name ?? "Uncategorized"}
          </AppText>
        </View>
      </View>

      <View
        style={[
          styles.divider,
          {
            backgroundColor: colors.divider,
          },
        ]}
      />

      <View style={styles.row}>
        <AppText color="secondary">
          Quantity
        </AppText>

        <AppText variant="titleMedium">
          {product.current_quantity}
        </AppText>
      </View>

      <View style={styles.row}>
        <AppText color="secondary">
          Purchase Price
        </AppText>

        <AppText variant="titleMedium">
          ₹
{Number(product.purchase_price).toLocaleString("en-IN")}
        </AppText>
      </View>

      <View style={styles.row}>
        <AppText color="secondary">
          Selling Price
        </AppText>

        <AppText variant="titleMedium">
          ₹
{Number(product.selling_price).toLocaleString("en-IN")}
        </AppText>
      </View>

      <View style={styles.row}>
        <AppText color="secondary">
          Purchase Value
        </AppText>

        <AppText variant="titleMedium">
          ₹
{Number(product.purchase_value).toLocaleString("en-IN")}
        </AppText>
      </View>

      <View style={styles.row}>
        <AppText color="secondary">
          Selling Value
        </AppText>

        <AppText variant="titleMedium">
          ₹
          {Number(
            product.selling_value,
          ).toLocaleString()}
        </AppText>
      </View>

      <View style={styles.row}>
        <AppText color="secondary">
          Potential Profit
        </AppText>

        <AppText
          variant="titleMedium"
          color="success"
        >
          ₹
          {Number(
            product.potential_profit,
          ).toLocaleString()}
        </AppText>
      </View>

      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor: statusColor,
            },
          ]}
        >
          <AppText
            variant="bodySmall"
            color="inverse"
          >
            {product.status.replace("_", " ")}
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  headerContent: {
    flex: 1,
    marginLeft: 12,
  },

  divider: {
    height: 1,
    marginVertical: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  statusContainer: {
    marginTop: 8,
    alignItems: "flex-end",
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
});