// import React, {
//   useCallback,
//   useMemo,
//   useState,
// } from "react";

// import {
//   FlatList,
//   RefreshControl,
//   StyleSheet,
//   View,
// } from "react-native";

// import {
//   AppLoader,
//   AppText,
//   ErrorView,
// } from "../../../components/ui";

// import SearchToolbar from "../../../components/common/SearchToolbar";

// import { useDebounce } from "../../../hooks/useDebounce";

// import { useAppTheme } from "../../../core/theme/useAppTheme";

// import TransactionCard from "../components/TransactionCard";

// import TransactionFilterBottomSheet, {
//   TransactionType,
// } from "../components/Filter/TransactionFilterBottomSheet";
// import { ActivityIndicator } from "react-native-paper";
// import { useInfiniteInventoryHistory } from "../hooks/useInfiniteInventoryHistory";


// export default function InventoryHistoryScreen() {
//   const { colors } = useAppTheme();

//   /* ===========================================================
//       Search
//   =========================================================== */

//   const [search, setSearch] =
//     useState("");

//   const debouncedSearch =
//     useDebounce(search, 500);

//   /* ===========================================================
//       Filter
//   =========================================================== */

//   const [filterVisible, setFilterVisible] =
//     useState(false);

//   const [selectedType, setSelectedType] =
//     useState<TransactionType>("");

//   const activeFilterCount =
//     selectedType ? 1 : 0;

//   /* ===========================================================
//       Query
//   =========================================================== */

//   const {
//   data,
//   isLoading,
//   isRefetching,
//   refetch,
//   error,
//   fetchNextPage,
//   hasNextPage,
//   isFetchingNextPage,
// } = useInfiniteInventoryHistory(
//   debouncedSearch,
//   selectedType || undefined
// );


// const transactions = useMemo(() => {
//   return (
//     data?.pages.flatMap(
//       (page) => page.data ?? []
//     ) ?? []
//   );
// }, [data]);
//   /* ===========================================================
//       Refresh
//   =========================================================== */

//   const onRefresh = useCallback(() => {
//     refetch();
//   }, [refetch]);

//   /* ===========================================================
//       Loading
//   =========================================================== */

//   if (isLoading) {
//     return (
//       <AppLoader message="Loading inventory history..." />
//     );
//   }

//   /* ===========================================================
//       Error
//   =========================================================== */

//   if (error) {
//     return (
//       <ErrorView
//         title="Unable to load inventory history"
//         message="Please try again."
//         onRetry={refetch}
//       />
//     );
//   }

//   /* ===========================================================
//       UI
//   =========================================================== */

//   return (
//     <View
//       style={[
//         styles.container,
//         {
//           backgroundColor:
//             colors.background,
//         },
//       ]}
//     >
//       <View style={styles.searchContainer}>
//   <SearchToolbar
//     placeholder="Search transactions..."
//     value={search}
//     onChangeText={setSearch}
//     showFilter
//     activeFilterCount={activeFilterCount}
//     onFilterPress={() =>
//       setFilterVisible(true)
//     }
//   />
// </View>

//       <FlatList
//         data={transactions}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TransactionCard item={item} />
//         )}
//         contentContainerStyle={
//   transactions.length
//     ? styles.list
//     : styles.emptyContent
// }
//         refreshControl={
//           <RefreshControl
//             refreshing={
//               isRefetching
//             }
//             onRefresh={onRefresh}
//             colors={[
//               colors.primary,
//             ]}
//             tintColor={
//               colors.primary
//             }
//           />
//         }
//         ListFooterComponent={
//   isFetchingNextPage ? (
//     <View style={styles.footerLoader}>
//       <ActivityIndicator
//         color={colors.primary}
//       />

//       <AppText
//         variant="bodyMedium"
//         style={styles.footerText}
//       >
//         Loading more transactions...
//       </AppText>
//     </View>
//   ) : null
// }
//         ListEmptyComponent={
//           <View
//             style={styles.empty}
//           >
//             <AppText color="tertiary">
//               No inventory
//               transactions found.
//             </AppText>
//           </View>
//         }
//         showsVerticalScrollIndicator={
//           false
//         }
//         onEndReached={() => {

//   if (hasNextPage && !isFetchingNextPage) {
//     console.log("Fetching next page...");
//     fetchNextPage();
//   }
// }}

// onEndReachedThreshold={0.5}
//       />

//       <TransactionFilterBottomSheet
//         visible={filterVisible}
//         selectedType={
//           selectedType
//         }
//         onDismiss={() =>
//           setFilterVisible(false)
//         }
//         onReset={() => {
//           setSelectedType("");
//           setFilterVisible(false);
//         }}
//         onApply={(type) => {
//           setSelectedType(type);
//           setFilterVisible(false);
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   list: {
//     paddingHorizontal: 16,
//   paddingBottom: 24,
//   },

//   emptyContent: {
//   flexGrow: 1,
//   justifyContent: "center",
//   paddingHorizontal: 16,
// },

//   empty: {
//     alignItems: "center",
//   },
//   searchContainer: {
//   paddingHorizontal: 16,
//   paddingTop: 16,
//   paddingBottom: 12,
// },

// footerLoader: {
//   paddingVertical: 20,
//   justifyContent: "center",
//   alignItems: "center",
// },

// footerText: {
//   marginTop: 8,
// },
// });




import React, {
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";

import { ActivityIndicator } from "react-native-paper";

import {
  AppLoader,
  AppText,
  ErrorView,
} from "../../../components/ui";

import SearchToolbar from "../../../components/common/SearchToolbar";

import { useDebounce } from "../../../hooks/useDebounce";

import { useAppTheme } from "../../../core/theme/useAppTheme";

import TransactionCard from "../components/TransactionCard";

import TransactionFilterBottomSheet, {
  TransactionType,
} from "../components/Filter/TransactionFilterBottomSheet";

import { useInfiniteInventoryHistory } from "../hooks/useInfiniteInventoryHistory";

export default function InventoryHistoryScreen() {
  const { colors } = useAppTheme();

  /* ===========================================================
      Search
  =========================================================== */

  const [search, setSearch] =
    useState("");

  const debouncedSearch =
    useDebounce(search, 500);

  /* ===========================================================
      Filter
  =========================================================== */

  const [filterVisible, setFilterVisible] =
    useState(false);

  const [selectedType, setSelectedType] =
    useState<TransactionType>("");

  const activeFilterCount =
    selectedType ? 1 : 0;

  /* ===========================================================
      Query
  =========================================================== */

  const {
    data,
    isLoading,
    isRefetching,
    refetch,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteInventoryHistory(
    debouncedSearch,
    selectedType || undefined
  );

  /* ===========================================================
      Transactions
  =========================================================== */

  const transactions = useMemo(() => {
    return (
      data?.pages.flatMap(
        (page) => page.data ?? []
      ) ?? []
    );
  }, [data]);

  /* ===========================================================
      Callbacks
  =========================================================== */

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const renderItem = useCallback(
    ({ item }) => (
      <TransactionCard item={item} />
    ),
    []
  );

  const keyExtractor = useCallback(
    (item: any) => item.id,
    []
  );

  const onEndReached = useCallback(() => {
    if (
      !hasNextPage ||
      isFetchingNextPage
    ) {
      return;
    }

    fetchNextPage();
  }, [
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  /* ===========================================================
      Loading
  =========================================================== */

  if (isLoading) {
    return (
      <AppLoader message="Loading inventory history..." />
    );
  }

  /* ===========================================================
      Error
  =========================================================== */

  if (error) {
    return (
      <ErrorView
        title="Unable to load inventory history"
        message="Please try again."
        onRetry={refetch}
      />
    );
  }

    /* ===========================================================
      UI
  =========================================================== */

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={styles.searchContainer}>
        <SearchToolbar
          placeholder="Search transactions..."
          value={search}
          onChangeText={setSearch}
          showFilter
          activeFilterCount={activeFilterCount}
          onFilterPress={() =>
            setFilterVisible(true)
          }
        />
      </View>

      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={
          transactions.length > 0
            ? styles.list
            : styles.emptyContent
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListFooterComponent={
          isFetchingNextPage ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator
                color={colors.primary}
              />

              <AppText
                variant="bodyMedium"
                style={styles.footerText}
              >
                Loading more transactions...
              </AppText>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <AppText color="tertiary">
              No inventory transactions found.
            </AppText>
          </View>
        }
      />

      <TransactionFilterBottomSheet
        visible={filterVisible}
        selectedType={selectedType}
        onDismiss={() =>
          setFilterVisible(false)
        }
        onReset={() => {
          setSelectedType("");
          setFilterVisible(false);
        }}
        onApply={(type) => {
          setSelectedType(type);
          setFilterVisible(false);
        }}
      />
    </View>
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
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  emptyContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  footerLoader: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  footerText: {
    marginTop: 8,
  },
});