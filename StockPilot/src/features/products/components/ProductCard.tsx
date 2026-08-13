import React from "react";
import { StyleSheet, View } from "react-native";

import {
  Card,
  Text,
  IconButton,
  Avatar,
} from "react-native-paper";

import { Product } from "../types";
import ProductStatusChip from "./ProductStatusChip";

interface ProductCardProps {
  product: Product;

  onPress: () => void;

  onEdit: () => void;

  onDelete: () => void;
}

const ProductCard = ({
  product,
  onPress,
  onEdit,
  onDelete,
}: ProductCardProps) => {
  return (
    <Card
      mode="outlined"
      style={styles.card}
      onPress={onPress}
    >
      <Card.Content>

        {/* Header */}

        <View style={styles.header}>

          <Avatar.Image
            size={60}
            source={
  product.images.length > 0
    ? { uri: product.images[0] }
    : {
        uri: "https://via.placeholder.com/150?text=No+Image",
      }
}
          />

          <View style={styles.info}>

            <Text
              variant="titleMedium"
              numberOfLines={1}
            >
              {product.name}
            </Text>

            <Text variant="bodySmall">
              SKU: {product.sku}
            </Text>

            <Text variant="bodySmall">
              {product.categoryName ?? "No Category"}
            </Text>

          </View>

          <ProductStatusChip
            status={product.status}
          />

        </View>

        {/* Divider Space */}

        <View style={styles.space} />

        {/* Price */}

        <View style={styles.row}>

          <Text variant="bodyMedium">
            Selling Price
          </Text>

          <Text
            variant="titleMedium"
            style={styles.price}
          >
            ₹{product.sellingPrice}
          </Text>

        </View>

        {/* Quantity */}

        <View style={styles.row}>

          <Text variant="bodyMedium">
            Quantity
          </Text>

          <Text variant="titleMedium">
            {product.currentQuantity}
          </Text>

        </View>

        {/* Action Buttons */}

        <View style={styles.actions}>

          <IconButton
            icon="pencil"
            onPress={onEdit}
          />

          <IconButton
            icon="delete"
            iconColor="#D32F2F"
            onPress={onDelete}
          />

        </View>

      </Card.Content>
    </Card>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  info: {
    flex: 1,
    marginLeft: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  price: {
    fontWeight: "bold",
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },

  space: {
    height: 12,
  },
});