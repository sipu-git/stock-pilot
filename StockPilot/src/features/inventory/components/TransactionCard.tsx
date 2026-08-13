import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

import { AppCard, AppText } from "../../../components/ui";
import { useAppTheme } from "../../../core/theme/useAppTheme";
import { InventoryTransaction } from "../types";
import { timeAgo } from "../../dashboard/utils/time";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProductStackParamList } from "../../../types/navigation";

export default function TransactionCard({
  item,
}: {
  item: InventoryTransaction;
}) {
  type NavigationProp =
  NativeStackNavigationProp<
    ProductStackParamList,
    "InventoryHistory"
  >;

const navigation =
  useNavigation<NavigationProp>();

  const { colors } = useAppTheme();

  const isIn = item.type === "STOCK_IN";

  const chipColor = isIn
    ? colors.success
    : item.type === "STOCK_OUT"
    ? colors.error
    : colors.warning;

  const chipBg = isIn
    ? colors.successContainer
    : item.type === "STOCK_OUT"
    ? colors.errorContainer
    : colors.warningContainer;

  const chipIcon = isIn
    ? "arrow-down-bold"
    : item.type === "STOCK_OUT"
    ? "arrow-up-bold"
    : "swap-horizontal-bold";

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("TransactionDetails", {
          transaction: item,
        })
      }
    >
      <AppCard
        style={[
          styles.card,
          {
            borderColor: colors.outlineVariant,
          },
        ]}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View
              style={[
                styles.chip,
                {
                  backgroundColor: chipBg,
                },
              ]}
            >
              <MaterialCommunityIcons
                name={chipIcon}
                size={13}
                color={chipColor}
              />

              <AppText
                variant="caption"
                style={[
                  styles.chipText,
                  {
                    color: chipColor,
                  },
                ]}
              >
                {isIn
                  ? "Stock In"
                  : item.type === "STOCK_OUT"
                  ? "Stock Out"
                  : "Adjustment"}
              </AppText>
            </View>

            <AppText
              variant="caption"
              color="tertiary"
            >
              {timeAgo(item.created_at)}
            </AppText>
          </View>

          <View style={styles.product}>
            <AppText
              variant="bodyLarge"
              style={styles.name}
            >
              {item.product_name}
            </AppText>

            <AppText
              variant="bodySmall"
              color="tertiary"
            >
              SKU: {item.sku}
            </AppText>
          </View>

          <View style={styles.bottom}>
            <AppText
              variant="titleMedium"
              style={{
                color: isIn
                  ? colors.success
                  : colors.error,
                fontWeight: "700",
              }}
            >
              {isIn ? "+" : "-"}
              {item.quantity} Units
            </AppText>

            <AppText
              variant="bodyMedium"
              color="tertiary"
            >
              {item.quantity_before} → {item.quantity_after}
            </AppText>
          </View>
        </View>
      </AppCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 14,
    overflow: "hidden",
  },

  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },

  chipText: {
    marginLeft: 4,
    fontWeight: "600",
  },

  product: {
    marginTop: 10,
  },

  name: {
    fontWeight: "700",
  },

  bottom: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});