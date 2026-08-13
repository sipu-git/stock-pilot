import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, View, RefreshControl } from "react-native";

import GradientHeader from "../../../components/common/GradientHeader";
import { useAppTheme } from "../../../core/theme/useAppTheme";
import { useNavigation } from "@react-navigation/native";

import SummaryCard from "../components/SummaryCard";
import InventoryValueCard from "../components/InventoryValueCard";
import RecentActivityCard from "../components/RecentActivityCard";
import { useDashboard } from "../hooks/useDashboard";
import { AppLoader, AppText, ErrorView } from "../../../components/ui";
import QuickActionsCard from "../components/QuickActionsCard";
import InventoryTrendChart from "../components/InventoryTrendChart";
import CategoryDistributionChart from "../components/CategoryDistributionChart";

export default function DashboardScreen() {
  const { colors } = useAppTheme();
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState("");
  const { data, isLoading, error, refetch, isRefetching } = useDashboard();

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <AppLoader message="Loading dashboard..." />;

  if (error) {
    return (
      <ErrorView
        title="Unable to load dashboard"
        message="Something went wrong while loading your dashboard."
        onRetry={refetch}
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <GradientHeader
  search={search}
  onSearchChange={setSearch}
/>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        <View style={styles.summaryWrapper}>
          <View style={styles.grid}>
            <SummaryCard
              index={0}
              title="Products"
              value={data?.summary.total_products ?? 0}
              icon="package-variant"
              color={colors.info}
              backgroundColor={colors.infoContainer}
              onPress={() =>
                navigation.navigate("Products", {
                  screen: "ProductList",
                })
              }
            />
            <SummaryCard
              index={1}
              title="Categories"
              value={data?.summary.total_categories ?? 0}
              icon="shape"
              color={colors.primary}
              backgroundColor={colors.primaryContainer}
              onPress={() => navigation.navigate("Categories")}
            />
            <SummaryCard
              index={2}
              title="Low Stock"
              value={data?.summary.low_stock ?? 0}
              icon="alert-circle"
              color={colors.warning}
              backgroundColor={colors.warningContainer}
              onPress={() =>
                navigation.navigate("Products", {
                  screen: "ProductList",
                  params: {
                    status: "LOW_STOCK",
                  },
                })
              }
            />
            <SummaryCard
              index={3}
              title="Out of Stock"
              value={data?.summary.out_of_stock ?? 0}
              icon="close-circle"
              color={colors.error}
              backgroundColor={colors.errorContainer}
              onPress={() =>
                navigation.navigate("Products", {
                  screen: "ProductList",
                  params: {
                    status: "OUT_OF_STOCK",
                  },
                })
              }
            />
          </View>
        </View>

        <InventoryValueCard
          value={Number(data?.summary.inventory_value ?? 0)}
        />

        <CategoryDistributionChart data={data?.categoryDistribution ?? []} />

        <RecentActivityCard items={data?.recentTransactions ?? []} />

        <QuickActionsCard />

        <InventoryTrendChart data={data?.trend ?? []} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 30 },

  summaryWrapper: {
    marginTop: 10,
    paddingHorizontal: 18,
    zIndex: 10,
  },
  grid: {
    flexDirection: "row",
    gap: 8,
  },
});
