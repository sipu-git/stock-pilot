import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

import { Product } from "../types";
import { useAppTheme } from "../../../core/theme/useAppTheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

interface Props {
  product: Product;
  onPress?: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const STOCK_LABEL: Record<StockStatus, string> = {
  in_stock: "In stock",
  low_stock: "Low stock",
  out_of_stock: "Out of stock",
};

function getStockStatus(
  quantity: number,
  minimumQuantity: number
): StockStatus {
  if (quantity <= 0) return "out_of_stock";

  if (quantity <= minimumQuantity)
    return "low_stock";

  return "in_stock";
}

export default function ProductGridCard({
  product,
  onPress,
  onEdit,
  onDelete,
}: Props) {
  const { colors } = useAppTheme();

  const status = getStockStatus(
  product.currentQuantity ?? 0,
  product.minimumQuantity ?? 10
);

console.log("Product Images:", product.images);

  const statusColor = {
    in_stock: colors.success,
    low_stock: colors.warning,
    out_of_stock: colors.error,
  }[status];

  return (
    <TouchableRipple
      onPress={onPress}
      borderless
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.outlineVariant,
        },
      ]}
    >
      <View>
        <View
          style={[
            styles.imageBlock,
            { backgroundColor: colors.primaryContainer },
          ]}
        >
          {product.images?.length > 0 ? (
//             <Image
//   source={{ uri: product.images[0] }}
//   style={styles.image}
//   resizeMode="cover"
// />
  <Image
  source={{
    uri: product.images[0].replace(
      "localhost",
      "10.31.37.186"
    ),
  }}
  style={styles.image}
  resizeMode="cover"
  onError={(e) =>
    console.log("IMAGE ERROR:", e.nativeEvent)
  }
/>
) : (
  <MaterialCommunityIcons
    name="package-variant"
    size={30}
    color={colors.onPrimaryContainer}
  />
)}

          <View style={[styles.badge, { backgroundColor: statusColor }]}>
            <Text style={styles.badgeText} numberOfLines={1}>
              {STOCK_LABEL[status]}
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text
            variant="labelLarge"
            numberOfLines={1}
            style={{ color: colors.onSurface }}
          >
            {product.name}
          </Text>

          {product.categoryName ? (
  <Text
    variant="bodySmall"
    numberOfLines={1}
    style={{
      color: colors.primary,
      marginTop: 2,
    }}
  >
    {product.categoryName}
  </Text>
) : null}

          <Text
            variant="labelSmall"
            numberOfLines={1}
            style={[styles.sku, { color: colors.onSurfaceVariant }]}
          >
            {product.sku}
          </Text>

          <View style={styles.quantityRow}>
  <Text
    variant="bodySmall"
    style={{ color: colors.onSurfaceVariant }}
  >
    Qty
  </Text>

  <Text
    variant="bodyMedium"
    style={{
      color: colors.onSurface,
      fontWeight: "700",
    }}
  >
    {product.currentQuantity}
  </Text>
</View>

          <View style={styles.footerRow}>
            <View>
    <Text
      variant="titleSmall"
      style={{
        color: colors.primary,
        fontWeight: "700",
      }}
    >
      ₹{Number(product.sellingPrice).toFixed(2)}
    </Text>

    <Text
      variant="bodySmall"
      style={{
        color: colors.onSurfaceVariant,
      }}
    >
      Buy ₹{Number(product.purchasePrice).toFixed(2)}
    </Text>
  </View>

            <View style={styles.actions}>
              <TouchableRipple
                onPress={onEdit}
                borderless
                style={styles.iconButton}
              >
                <MaterialCommunityIcons
                  name="pencil-outline"
                  size={17}
                  color={colors.onSurfaceVariant}
                />
              </TouchableRipple>

              <TouchableRipple
                onPress={onDelete}
                borderless
                style={styles.iconButton}
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={17}
                  color={colors.error}
                />
              </TouchableRipple>
            </View>
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },

  imageBlock: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
  width: "100%",
  height: "100%",
},

  badge: {
    position: "absolute",
    top: 6,
    left: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    maxWidth: "85%",
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  content: {
    padding: 10,
  },

  sku: {
    marginTop: 2,
    marginBottom: 8,
  },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  actions: {
    flexDirection: "row",
    gap: 4,
  },

  iconButton: {
    padding: 4,
    borderRadius: 8,
  },

  quantityRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
},
});
