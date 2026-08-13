import React, { useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

import ReportScreenLayout from "../components/ReportScreenLayout";
import ProductReportCard from "../components/ProductReportCard";
import EmptyProductReport from "../components/EmptyProductReport";

import { AppCard, AppText } from "../../../components/ui";
import SearchToolbar from "../../../components/common/SearchToolbar";

import { useDebounce } from "../../../hooks/useDebounce";
import { useInfiniteProductReport } from "../hooks/useInfiniteProductReport";

export default function ProductReportScreen() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const {
    data,
    isLoading,
    isError,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProductReport(debouncedSearch);

  const products =
    data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <ReportScreenLayout
      loading={isLoading}
      error={isError}
      onRetry={refetch}
    >
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchToolbar
            placeholder="Search by product name or SKU..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <AppCard style={styles.headerCard}>
              <AppText variant="headlineMedium">
                Product Performance
              </AppText>

              <AppText
                variant="bodyMedium"
                color="secondary"
                style={styles.subtitle}
              >
                Analyze profitability and inventory value
                for every product.
              </AppText>
            </AppCard>
          }
          renderItem={({ item }) => (
            <ProductReportCard product={item} />
          )}
          ListEmptyComponent={
            <EmptyProductReport
              search={debouncedSearch}
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
            />
          }
          onEndReached={() => {
            if (
              hasNextPage &&
              !isFetchingNextPage
            ) {
              fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator />

                <AppText
                  variant="bodyMedium"
                  style={styles.footerText}
                >
                  Loading more products...
                </AppText>
              </View>
            ) : null
          }
        />
      </View>
    </ReportScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },

  list: {
    flex: 1,
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  headerCard: {
    marginBottom: 20,
  },

  subtitle: {
    marginTop: 8,
  },

  footerLoader: {
    paddingVertical: 20,
    alignItems: "center",
  },

  footerText: {
    marginTop: 8,
  },
});