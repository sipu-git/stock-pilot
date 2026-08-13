import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProductScreen from "../../../features/products/screens/ProductScreen";
import AddProductScreen from "../../../features/products/screens/AddProductScreen";
import EditProductScreen from "../../../features/products/screens/EditProductScreen";
import ProductDetailsScreen from "../../../features/products/screens/ProductDetailsScreen";
import AppHeader from "../../../components/common/AppHeader";
import { useAppTheme } from "../../theme/useAppTheme";
import UpdateStockScreen from "../../../features/inventory/screens/UpdateStockScreen";
import { ProductStackParamList } from "../../../types/navigation";

const Stack =
  createNativeStackNavigator<ProductStackParamList>();
export function ProductStack() {
  const { colors } = useAppTheme();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductScreen}
        options={({ navigation }) => ({
          header: () => (
            <AppHeader
              title="Products"
              rightIcon="add"
              onRightPress={() => navigation.navigate("AddProduct")}
            />
          ),
        })}
      />

      <Stack.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={{
          title: "Add Product",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.onPrimary,
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 18,
          },
        }}
      />

      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={{
          title: "Edit Product",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.onPrimary,
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 18,
          },
        }}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          title: "Product Details",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.onPrimary,
          headerTitleStyle: {
            fontWeight: "700",
            fontSize: 18,
          },
        }}
      />

      <Stack.Screen
  name="UpdateStock"
  component={UpdateStockScreen}
  options={{
    title: "Update Stock",
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: colors.primary,
    },
    headerTintColor: colors.onPrimary,
    headerTitleStyle: {
      fontWeight: "700",
      fontSize: 18,
    },
  }}
/>
    </Stack.Navigator>
  );
}
