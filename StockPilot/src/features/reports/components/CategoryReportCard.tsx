import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


import { useAppTheme } from "../../../core/theme/useAppTheme";
import { CategoryReport } from "../types";
import { AppCard, AppText } from "../../../components/ui";


interface Props {
  category: CategoryReport;
}

export default function CategoryReportCard({
  category,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="view-grid"
          size={26}
          color={colors.primary}
        />

        <View style={styles.titleContainer}>
          <AppText variant="titleLarge">
            {category.category_name}
          </AppText>

          <AppText
            variant="bodySmall"
            color="secondary"
          >
            {category.total_products} Products •{" "}
            {category.total_units} Units
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
          Purchase Value
        </AppText>

        <AppText variant="titleMedium">
          ₹
{Number(category.purchase_value).toLocaleString("en-IN")}
        </AppText>
      </View>

      <View style={styles.row}>
        <AppText color="secondary">
          Selling Value
        </AppText>

        <AppText variant="titleMedium">
          ₹
{Number(category.selling_value).toLocaleString("en-IN")}
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
{Number(category.potential_profit).toLocaleString("en-IN")}
        </AppText>
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
    alignItems: "center",
  },

  titleContainer: {
    marginLeft: 12,
    flex: 1,
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
});