import React, { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { ActivityIndicator, FAB } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import EmptyProducts from "../components/EmptyProducts";
import ProductGridCard from "../components/ProductGridCard";

import { Product, ProductStatus } from "../types";

import { useDeleteProduct } from "../hooks/useDeleteProduct";

import ConfirmationDialog from "../../../components/common/ConfirmationDialog";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { useDebounce } from "../../../hooks/useDebounce";
import { useAppTheme } from "../../../core/theme/useAppTheme";
import { AppText } from "../../../components/ui";
import { useInfiniteProducts } from "../hooks/useInfiniteProducts";
import SortBottomSheet, { SortField } from "../components/Filter/SortBottomSheet";
import FilterBottomSheet from "../components/Filter/FilterBottomSheet";
import SearchToolbar from "../../../components/common/SearchToolbar";
import { ProductStackParamList } from "../../../types/navigation";


type Props = NativeStackScreenProps<
  ProductStackParamList,
  "ProductList"
>;

const GRID_GAP = 12;

export default function ProductsScreen({
  navigation,
  route,
}: Props) {
    const { colors } = useAppTheme();
    const initialStatus = route.params?.status;
  const { showSnackbar } = useSnackbar();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


  const [sortVisible, setSortVisible] = useState(false);


const [filterVisible, setFilterVisible] = useState(false);

const [selectedCategory, setSelectedCategory] = useState("");

const [selectedStatus, setSelectedStatus] =
  useState<ProductStatus | "">(
    initialStatus ?? ""
  );
const [selectedPriceType, setSelectedPriceType] =
  useState<"selling_price" | "purchase_price">("selling_price");

const [minPrice, setMinPrice] = useState("");

const [maxPrice, setMaxPrice] = useState("");

const [selectedSort, setSelectedSort] =
  useState<SortField>("created_at");

const [selectedOrder, setSelectedOrder] =
  useState<"asc" | "desc">("desc");

  useEffect(() => {
  if (route.params?.status) {
    setSelectedStatus(route.params.status);
  }
}, [route.params?.status]);


const activeFilterCount = [
  selectedCategory,
  selectedStatus,
  minPrice,
  maxPrice,
].filter(Boolean).length;

const isSortActive =
  selectedSort !== "created_at" ||
  selectedOrder !== "desc";

  const {
  data,
  isLoading,
  refetch,
  isRefetching,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteProducts({
  search: debouncedSearch,

  categoryId: selectedCategory,

  status: selectedStatus || undefined,

  priceType: selectedPriceType,

  minPrice: minPrice ? Number(minPrice) : undefined,

  maxPrice: maxPrice ? Number(maxPrice) : undefined,
  sort: selectedSort,
  order: selectedOrder,
});

 const products =
  data?.pages.flatMap((page) => page.data) ?? [];

  const { mutateAsync, isPending } = useDeleteProduct();

  const handleAddProduct = () => {
    navigation.navigate("AddProduct");
  };

  const handleViewProduct = (product: Product) => {
    navigation.navigate("ProductDetails", { productId: product.id });
  };

  const handleEditProduct = (product: Product) => {
    navigation.navigate("EditProduct", { productId: product.id });
  };

  const handleDeletePress = (product: Product) => {
    setSelectedProduct(product);
    setDeleteDialogVisible(true);
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      await mutateAsync(selectedProduct.id);

      showSnackbar("Product deleted successfully.", "success");

      setDeleteDialogVisible(false);
      setSelectedProduct(null);
    } catch (error: any) {
      showSnackbar(
        error?.response?.data?.message ?? "Unable to delete product.",
        "error"
      );
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <View style={styles.cardWrapper}>
        <ProductGridCard
          product={item}
          onPress={() => handleViewProduct(item)}
          onEdit={() => handleEditProduct(item)}
          onDelete={() => handleDeletePress(item)}
        />
      </View>
    ),
    []
  );

  if (isLoading) {
    return (
      <View
        style={[
          styles.loaderContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
        <AppText variant="bodyMedium" style={styles.loadingText}>
          Loading Products...
        </AppText>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <SearchToolbar
  placeholder="Search products..."
  value={search}
  onChangeText={setSearch}
  showFilter
  showSort
  activeFilterCount={activeFilterCount}
  isSortActive={isSortActive}
  onFilterPress={() => setFilterVisible(true)}
  onSortPress={() => setSortVisible(true)}
/>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
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
          Loading more products...
        </AppText>
      </View>
    ) : null
  }
        onEndReached={() => {
  if (hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }
}}

onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
  refetch();
}}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <EmptyProducts onAddProduct={handleAddProduct} />
        }
        contentContainerStyle={
          products.length === 0 ? styles.emptyContent : styles.listContent
        }
        showsVerticalScrollIndicator={false}
      />

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: colors.primary }]}
        color={colors.onPrimary}
        onPress={handleAddProduct}
      />


<SortBottomSheet
  visible={sortVisible}
  selectedSort={selectedSort}
  selectedOrder={selectedOrder}
  onDismiss={() => setSortVisible(false)}
  onSelect={(sort, order) => {
    setSelectedSort(sort);
    setSelectedOrder(order);
  }}
/>

<FilterBottomSheet
  visible={filterVisible}
  selectedCategory={selectedCategory}
  selectedStatus={selectedStatus}
  selectedPriceType={selectedPriceType}
  minPrice={minPrice}
  maxPrice={maxPrice}
  onDismiss={() => setFilterVisible(false)}
  onReset={() => {
    setSelectedCategory("");
    setSelectedStatus("");
    setSelectedPriceType("selling_price");
    setMinPrice("");
    setMaxPrice("");
    setFilterVisible(false);
  }}
  onApply={(
    category,
    status,
    priceType,
    min,
    max
  ) => {
    setSelectedCategory(category);
    setSelectedStatus(status);
    setSelectedPriceType(priceType);
    setMinPrice(min);
    setMaxPrice(max);

    setFilterVisible(false);
  }}
/>
      <ConfirmationDialog
        visible={deleteDialogVisible}
        title="Delete Product"
        message={`Are you sure you want to delete "${
          selectedProduct?.name ?? ""
        }"?`}
        loading={isPending}
        confirmText="Delete"
        onDismiss={() => {
          setDeleteDialogVisible(false);
          setSelectedProduct(null);
        }}
        onConfirm={confirmDelete}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  search: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 1,
  },

  row: {
    justifyContent: "space-between",
    gap: GRID_GAP,
  },

  cardWrapper: {
    flex: 1,
    marginBottom: GRID_GAP,
  },

  listContent: {
    paddingBottom: 140,
  },

  emptyContent: {
    flexGrow: 1,
    justifyContent: "center",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,
  },

  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
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
