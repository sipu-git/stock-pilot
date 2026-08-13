import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CategoryForm } from "../components/CategoryForm";
import { useCreateCategory } from "../hooks/useCreateCategory";

import type { CategoryPayload } from "../types";
import { useSnackbar } from "../../../hooks/useSnackbar";

export default function AddCategoryScreen() {
  const navigation = useNavigation();

  const { showSnackbar } = useSnackbar();

  const { mutateAsync, isPending } = useCreateCategory();

  const handleCreateCategory = async (
    data: CategoryPayload
  ) => {
    try {
      await mutateAsync(data);

      showSnackbar(
        "Category created successfully.",
        "success"
      );

      navigation.goBack();
    } catch (error: any) {

      showSnackbar(
        error?.response?.data?.message ??
          "Unable to create category.",
        "error"
      );
    }
  };

  return (
    <View style={styles.container}>
      <CategoryForm
        loading={isPending}
        onSubmit={handleCreateCategory}
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