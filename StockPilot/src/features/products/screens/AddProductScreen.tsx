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
import { useCreateProduct } from "../hooks/useCreateProduct";
import { useUploadProductImage } from "../hooks/useUploadProductImage";
import { useSnackbar } from "../../../hooks/useSnackbar";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "AddProduct"
>;

export default function AddProductScreen({
  navigation,
}: Props) {
  const createProduct = useCreateProduct();
  const { showSnackbar } = useSnackbar();

  const uploadImage =
    useUploadProductImage();

  const handleSubmit = async (
    data: ProductFormData,
    images: string[]
  ) => {
    try {
      // Create Product
      const response =
        await createProduct.mutateAsync(
          data
        );

      const product =
        response.data;

      // Upload Images
      if (images.length > 0) {
          console.log("Images:", images);

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
    "Product created successfully.",
    "success"
  );

  navigation.goBack();
    } catch (error: any) {

  showSnackbar(
    "Unable to create product.",
    "error"
  );
}
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() =>
            navigation.goBack()
          }
        />

        <Appbar.Content
          title="Add Product"
        />
      </Appbar.Header>

      <Surface style={styles.container}>
        {createProduct.isPending ? (
          <ActivityIndicator
            style={styles.loader}
          />
        ) : (
          <ProductForm
            submitButtonText="Create Product"
            loading={
              createProduct.isPending ||
              uploadImage.isPending
            }
            onSubmit={handleSubmit}
          />
        )}
      </Surface>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loader: {
    marginTop: 40,
  },
});