import React, { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { ActivityIndicator, FAB, Searchbar, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useCategories } from "../hooks/useCategories";
import { useDeleteCategory } from "../hooks/useDeleteCategory";

import { CategoryCard } from "../components/CategoryCard";
import { EmptyCategory } from "../components/EmptyCategory";

import { Category } from "../types";
import { CategoryStackParamList } from "../../../types/navigation";

import ConfirmationDialog from "../../../components/common/ConfirmationDialog";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { useDebounce } from "../../../hooks/useDebounce";
import { useAppTheme } from "../../../core/theme/useAppTheme";
import { AppText } from "../../../components/ui";
import SearchToolbar from "../../../components/common/SearchToolbar";
import { useInfiniteCategories } from "../hooks/useInfiniteCategories";

type NavigationProp = NativeStackNavigationProp<CategoryStackParamList>;

export default function CategoryScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { showSnackbar } = useSnackbar();
  const { colors } = useAppTheme();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const {
    data,
    isLoading,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCategories(debouncedSearch);

  const categories = data?.pages.flatMap((page) => page.data) ?? [];

  const { mutateAsync, isPending } = useDeleteCategory();

  const handleEdit = (category: Category) => {
    navigation.navigate("EditCategory", {
      category,
    });
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setDeleteDialogVisible(true);
  };

  const confirmDelete = async () => {
    if (!selectedCategory) return;

    try {
      await mutateAsync(selectedCategory.id);

      showSnackbar("Category deleted successfully.", "success");

      setDeleteDialogVisible(false);
      setSelectedCategory(null);
    } catch (error: any) {
      showSnackbar(
        error?.response?.data?.message ?? "Unable to delete category.",
        "error",
      );
    }
  };

  if (isLoading) {
    return (
      <View
        style={[
          styles.loaderContainer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />

        <AppText variant="bodyMedium" style={styles.loadingText}>
          Loading Categories...
        </AppText>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <SearchToolbar
        placeholder="Search categories..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}

        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={<EmptyCategory />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}

        ListFooterComponent={
  isFetchingNextPage ? (
    <View style={styles.footerLoader}>
      <ActivityIndicator color={colors.primary} />

      <AppText
        variant="bodyMedium"
        style={styles.footerText}
      >
        Loading more categories...
      </AppText>
    </View>
  ) : null
}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("AddCategory")}
      />

      <ConfirmationDialog
        visible={deleteDialogVisible}
        title="Delete Category"
        message={`Are you sure you want to delete "${
          selectedCategory?.name ?? ""
        }"?`}
        loading={isPending}
        confirmText="Delete"
        onDismiss={() => {
          setDeleteDialogVisible(false);
          setSelectedCategory(null);
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

  listContent: {
    paddingBottom: 100,
  },
  footerLoader: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  footerText: {
    marginTop: 8,
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
});
