import React from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";

import ReportScreenLayout from "../components/ReportScreenLayout";

import { useInventoryValuation } from "../hooks/useInventoryValuation";
import { AppCard, AppText } from "../../../components/ui";
import ReportMetric from "../components/ReportMetric";

export default function InventoryValuationScreen() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useInventoryValuation();

  return (
    <ReportScreenLayout
      loading={isLoading}
      error={isError}
      onRetry={refetch}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        }
      >
        <AppCard style={styles.headerCard}>
          <AppText variant="headlineMedium">
            Inventory Valuation
          </AppText>

          <AppText
            variant="bodyMedium"
            color="secondary"
            style={styles.subtitle}
          >
            Overview of your inventory value and expected profit.
          </AppText>
        </AppCard>

        <ReportMetric
          label="Total Products"
          value={data?.total_products ?? 0}
        />

        <ReportMetric
          label="Total Units"
          value={data?.total_units ?? 0}
        />

        <ReportMetric
          label="Purchase Value"
          value={`₹${Number(
            data?.purchase_value ?? 0
          ).toLocaleString("en-IN")}`}
        />

        <ReportMetric
          label="Selling Value"
          value={`₹${Number(
            data?.selling_value ?? 0
          ).toLocaleString("en-IN")}`}
        />

        <ReportMetric
          label="Potential Profit"
          value={`₹${Number(
            data?.potential_profit ?? 0
          ).toLocaleString("en-IN")}`}
        />
      </ScrollView>
    </ReportScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 16,
    paddingBottom: 40,
  },

  headerCard: {
    marginBottom: 20,
  },

  subtitle: {
    marginTop: 8,
  },
});