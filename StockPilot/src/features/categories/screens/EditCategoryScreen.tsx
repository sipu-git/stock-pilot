import React from "react";
import { StyleSheet, View } from "react-native";
import {
  useNavigation,
  useRoute,
  RouteProp,
} from "@react-navigation/native";

import { CategoryForm } from "../components/CategoryForm";
import { useUpdateCategory } from "../hooks/useUpdateCategory";

import type { Category, CategoryPayload } from "../types";
import { useSnackbar } from "../../../hooks/useSnackbar";

type RouteParams = {
  EditCategory: {
    category: Category;
  };
};

export default function EditCategoryScreen() {
  const navigation = useNavigation();

  const route =
    useRoute<RouteProp<RouteParams, "EditCategory">>();

  const { category } = route.params;

  const { mutateAsync, isPending } = useUpdateCategory();

  const { showSnackbar } = useSnackbar();

  const handleUpdate = async (
    data: CategoryPayload
  ) => {
    try {
      await mutateAsync({
        id: category.id,
        data,
      });

      showSnackbar(
        "Category updated successfully.",
        "success"
      );

      navigation.goBack();
    } catch (error: any) {
      showSnackbar(
        error?.response?.data?.message ??
          "Unable to update category.",
        "error"
      );
    }
  };

  return (
    <View style={styles.container}>
      <CategoryForm
        loading={isPending}
        defaultValues={{
          name: category.name,
          description: category.description ?? "",
        }}
        onSubmit={handleUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
});