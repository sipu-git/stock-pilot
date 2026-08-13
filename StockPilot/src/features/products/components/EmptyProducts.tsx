import React from "react";
import { StyleSheet, View } from "react-native";

import {
  Button,
  Text,
} from "react-native-paper";

interface EmptyProductsProps {
  onAddProduct: () => void;
}

const EmptyProducts = ({
  onAddProduct,
}: EmptyProductsProps) => {
  return (
    <View style={styles.container}>

      <Text
        variant="displaySmall"
        style={styles.icon}
      >
        📦
      </Text>

      <Text
        variant="headlineSmall"
        style={styles.title}
      >
        No Products Found
      </Text>

      <Text
        variant="bodyMedium"
        style={styles.description}
      >
        Start managing your inventory by
        adding your first product.
      </Text>

      <Button
        mode="contained"
        icon="plus"
        onPress={onAddProduct}
        style={styles.button}
      >
        Add Product
      </Button>

    </View>
  );
};

export default EmptyProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  icon: {
    marginBottom: 20,
  },

  title: {
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },

  description: {
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 22,
    marginBottom: 28,
  },

  button: {
    width: 180,
  },
});