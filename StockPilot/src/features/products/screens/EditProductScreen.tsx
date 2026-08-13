import React from "react";
import { Alert, StyleSheet } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Surface,
} from "react-native-paper";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import ProductForm from "../components/ProductForm";



import { ProductFormData } from "../validation/productSchema";

import { RootStackParamList } from "../../../core/navigation/types";
import { useProduct } from "../hooks/useProduct";
import { useUpdateProduct } from "../hooks/useUpdateProduct";
import { useUploadProductImage } from "../hooks/useUploadProductImage";
import { useSnackbar } from "../../../hooks/useSnackbar";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "EditProduct"
>;

export default function EditProductScreen({
  navigation,
  route,
}: Props) {
  const { productId } = route.params;
  const { showSnackbar } = useSnackbar();

  const {
    data,
    isLoading,
    refetch,
  } = useProduct(productId);

  const updateProduct =
    useUpdateProduct();

  const uploadImage =
    useUploadProductImage();

  const product =
    data?.data;

  const handleSubmit = async (
    formData: ProductFormData,
    images: string[]
  ) => {

    if (!product) return;

    try {
      await updateProduct.mutateAsync({
        id: product.id,
        payload: formData,
      });

      if (images.length > 0) {
        await Promise.all(
          images.map((image) =>
            uploadImage.mutateAsync({
              productId: product.id,
              image,
            })
          )
        );
      }

      showSnackbar(
    "Product updated successfully.",
    "success"
  );

  navigation.goBack();
    } catch (error) {
      showSnackbar(
    "Unable to update product.",
    "error"
  );
    }
  };

  if (isLoading) {
    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() =>
              navigation.goBack()
            }
          />

          <Appbar.Content
            title="Edit Product"
          />
        </Appbar.Header>

        <Surface style={styles.loaderContainer}>
          <ActivityIndicator
            size="large"
          />
        </Surface>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() =>
              navigation.goBack()
            }
          />

          <Appbar.Content
            title="Edit Product"
          />
        </Appbar.Header>

        <Surface style={styles.loaderContainer}>
          <Appbar.Content
            title="Product not found"
          />
        </Surface>
      </>
    );
  }

  return (
    <>

      <Surface style={styles.container}>
        <ProductForm
  defaultValues={product}
  loading={
    updateProduct.isPending ||
    uploadImage.isPending
  }
  showOpeningStock={false}
  submitButtonText="Update Product"
  onSubmit={handleSubmit}
/>
      </Surface>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});