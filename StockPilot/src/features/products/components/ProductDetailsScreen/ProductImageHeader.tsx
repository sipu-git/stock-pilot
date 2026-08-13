import React from "react";
import {
  Image,
  StyleSheet,
  View,
} from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Product } from "../../types";
import { useAppTheme } from "../../../../core/theme/useAppTheme";
import { AppCard, AppText } from "../../../../components/ui";



interface Props {
  product: Product;
}

export default function ProductImageHeader({
  product,
}: Props) {
  const { colors } = useAppTheme();

  const statusColor = {
    ACTIVE: colors.success,
    LOW_STOCK: colors.warning,
    OUT_OF_STOCK: colors.error,
    ARCHIVED: colors.outline,
  }[product.status];

  return (
    <AppCard style={styles.card}>
      <View
        style={[
          styles.imageContainer,
          {
            backgroundColor:
              colors.primaryContainer,
          },
        ]}
      >
        {product.images?.length > 0 ? (
        //   <Image
        //     source={{
        //       uri: product.images[0],
        //     }}
        //     style={styles.image}
        //     resizeMode="cover"
        //   />

        <Image
          source={{
            uri: product.images[0].replace(
              "localhost",
              "192.168.1.10"
            ),
          }}
          />
        ) : (
          <MaterialCommunityIcons
            name="package-variant"
            size={70}
            color={colors.onPrimaryContainer}
          />
        )}
      </View>

      <View style={styles.content}>
        <AppText
          variant="headlineSmall"
          style={[
            styles.title,
            {
              color: colors.onSurface,
            },
          ]}
        >
          {product.name}
        </AppText>

        {!!product.categoryName && (
          <AppText
            variant="bodyMedium"
            style={{
              color: colors.primary,
              marginTop: 4,
            }}
          >
            {product.categoryName}
          </AppText>
        )}

        <View
          style={[
            styles.badge,
            {
              backgroundColor: statusColor,
            },
          ]}
        >
          <AppText
            variant="labelMedium"
            style={styles.badgeText}
          >
            {product.status.replace(/_/g, " ")}
          </AppText>
        </View>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    marginBottom: 16,
  },

  imageContainer: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  content: {
    padding: 16,
    alignItems: "center",
  },

  title: {
    fontWeight: "700",
    textAlign: "center",
  },

  badge: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: "#FFFFFF",
    fontWeight: "700",
    textTransform: "capitalize",
  },
});