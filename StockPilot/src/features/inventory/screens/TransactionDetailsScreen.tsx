import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { RouteProp, useRoute } from "@react-navigation/native";

import { AppCard, AppText } from "../../../components/ui";
import { useAppTheme } from "../../../core/theme/useAppTheme";
import { timeAgo } from "../../dashboard/utils/time";
import { ProductStackParamList } from "../../../types/navigation";

export default function TransactionDetailsScreen() {
  const { colors } = useAppTheme();

const route = useRoute<
  RouteProp<
    ProductStackParamList,
    "TransactionDetails"
  >
>();
  const { transaction } = route.params;

  const renderRow = (
    label: string,
    value: string | number | null
  ) => (
    <View style={styles.row}>
      <AppText
        variant="bodySmall"
        color="tertiary"
      >
        {label}
      </AppText>

      <AppText
        variant="bodyMedium"
        style={styles.value}
      >
        {value ?? "-"}
      </AppText>
    </View>
  );

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
      contentContainerStyle={styles.container}
    >
      <AppCard style={styles.card}>
        <AppText
          variant="headlineSmall"
          style={styles.title}
        >
          {transaction.product_name}
        </AppText>

        <AppText
          variant="bodySmall"
          color="tertiary"
        >
          SKU: {transaction.sku}
        </AppText>

        <View
          style={[
            styles.divider,
            {
              backgroundColor: colors.outlineVariant,
            },
          ]}
        />

        {renderRow("Transaction", transaction.type)}

        {renderRow("Quantity", transaction.quantity)}

        {renderRow(
          "Stock",
          `${transaction.quantity_before} → ${transaction.quantity_after}`
        )}

        {renderRow(
          "Reference",
          transaction.reference_no
        )}

        {renderRow(
          "Unit Cost",
          transaction.unit_cost
            ? `₹${transaction.unit_cost}`
            : "-"
        )}

        {renderRow(
          "Notes",
          transaction.notes
        )}

        {renderRow(
          "Created",
          timeAgo(transaction.created_at)
        )}
      </AppCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  card: {
    borderRadius: 16,
    padding: 18,
  },

  title: {
    fontWeight: "700",
  },

  divider: {
    height: 1,
    marginVertical: 18,
  },

  row: {
    marginBottom: 18,
  },

  value: {
    marginTop: 4,
    fontWeight: "600",
  },
});