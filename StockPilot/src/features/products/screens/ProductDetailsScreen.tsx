
import {
  ScrollView,
  StyleSheet,
} from "react-native";

import {
  Surface,
} from "react-native-paper";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import {
  AppLoader,
  ErrorView,
} from "../../../components/ui";

import { ProductStackParamList } from "../../../core/navigation/types";
import { useAppTheme } from "../../../core/theme/useAppTheme";


import { useProduct } from "../hooks/useProduct";
import ProductMetaSection from "../components/ProductDetailsScreen/ProductMetaSection";
import ProductInventorySection from "../components/ProductDetailsScreen/ProductInventorySection";
import ProductPricingSection from "../components/ProductDetailsScreen/ProductPricingSection";
import ProductInfoSection from "../components/ProductDetailsScreen/ProductInfoSection";
import ProductImageHeader from "../components/ProductDetailsScreen/ProductImageHeader";
import ProductActionSection from "../components/ProductDetailsScreen/ProductActionSection";

type Props = NativeStackScreenProps<
  ProductStackParamList,
  "ProductDetails"
>;

export default function ProductDetailsScreen({
  navigation,
  route,
}: Props) {
  const { colors } = useAppTheme();

  const { productId } = route.params;

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useProduct(productId);

  const product = data?.data;


  if (isLoading) {
    return (
      <>

        <AppLoader
          message="Loading product..."
        />
      </>
    );
  }

  if (isError || !product) {
    return (
      <>

        <ErrorView
          title="Unable to load product"
          message="Please try again."
          onRetry={refetch}
        />
      </>
    );
  }

  return (
    <Surface
      style={[
        styles.container,
        {
          backgroundColor:
            colors.background,
        },
      ]}
    >


      <ScrollView
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <ProductImageHeader
          product={product}
        />

        <ProductInfoSection
          product={product}
        />

        <ProductPricingSection
          product={product}
        />

        <ProductInventorySection
          product={product}
        />

        <ProductMetaSection
          product={product}
        />

        <ProductActionSection
  onEditPress={() =>
    navigation.navigate("EditProduct", {
      productId: product.id,
    })
  }
  onUpdateStockPress={() =>
    navigation.navigate("UpdateStock", {
      productId: product.id,
    })
  }
/>
      </ScrollView>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },
});