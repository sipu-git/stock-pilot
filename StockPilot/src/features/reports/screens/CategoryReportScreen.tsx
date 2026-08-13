import React from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
} from "react-native";

import ReportScreenLayout from "../components/ReportScreenLayout";

import { useCategoryReport } from "../hooks/useCategoryReport";
import { AppCard, AppText } from "../../../components/ui";
import CategoryReportCard from "../components/CategoryReportCard";
import CategoryDistributionChart from "../../dashboard/components/CategoryDistributionChart";

export default function CategoryReportScreen() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useCategoryReport();

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
            Category Report
          </AppText>

          <AppText
            variant="bodyMedium"
            color="secondary"
            style={styles.subtitle}
          >
            Inventory grouped by category with valuation details.
          </AppText>
        </AppCard>

        {data?.map((category) => (
          <CategoryReportCard
            key={category.category_id}
            category={category}
          />
        ))}

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