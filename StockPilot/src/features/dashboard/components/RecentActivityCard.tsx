import React from "react";
import { Pressable, StyleSheet, View, useColorScheme } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

import { useAppTheme } from "../../../core/theme/useAppTheme";
import { AppCard, AppText } from "../../../components/ui";
import { timeAgo } from "../utils/time";

export interface ActivityItem {
  id: string;
  product_name: string;
  type: "STOCK_IN" | "STOCK_OUT" | "ADJUSTMENT";
  quantity: number;
  quantity_before: number;
  quantity_after: number;
  created_at: string;
}

interface Props {
  items: ActivityItem[];
}

function getActivityLabel(type: ActivityItem["type"]) {
  switch (type) {
    case "STOCK_IN":
      return "Stock In";

    case "STOCK_OUT":
      return "Stock Out";

    case "ADJUSTMENT":
      return "Adjustment";

    default:
      return type;
  }
}

export default function RecentActivityCard({ items }: Props) {
  const { colors } = useAppTheme();
  const navigation = useNavigation<any>();
  const isDark = useColorScheme() === "dark";

  if (!items.length) return null;

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
  <AppText
    variant="label"
    color="tertiary"
    style={styles.sectionLabel}
  >
    RECENT ACTIVITY
  </AppText>

  <Pressable
    onPress={() => navigation.navigate("InventoryHistory")}
  >
    <AppText
      variant="bodySmall"
      style={{
        color: colors.primary,
        fontWeight: "600",
      }}
    >
      View All
    </AppText>
  </Pressable>
</View>

      <Animated.View entering={FadeInDown.delay(260).duration(350).springify()}>
        <AppCard
          style={[
            styles.card,
            {
              backgroundColor: colors.surface,
              shadowColor: isDark ? "#000" : colors.primaryDark,
            },
          ]}
        >
          {items.map((item, i) => {
            const isIn = item.type === "STOCK_IN";
            const iconBg = isIn ? colors.successContainer : colors.errorContainer;
            const iconColor = isIn ? colors.success : colors.error;

            return (
              <View
                key={item.id}
                style={[
                  styles.row,
                  i !== items.length - 1 && {
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: colors.divider,
                  },
                ]}
              >
                <View style={[styles.iconWrapper, { backgroundColor: iconBg }]}>
                  <MaterialCommunityIcons
                    name={isIn ? "arrow-down" : "arrow-up"}
                    size={18}
                    color={iconColor}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <AppText variant="bodyMedium" numberOfLines={1}>
                    {item.product_name}
                  </AppText>
                  <AppText variant="caption" color="tertiary">
                    {getActivityLabel(item.type)} · {timeAgo(item.created_at)}
                  </AppText>
                </View>

                <View style={{ alignItems: "flex-end" }}>
  <AppText
    variant="bodyMedium"
    style={{
      color: isIn ? colors.success : colors.error,
    }}
  >
    {isIn ? "+" : "-"}
    {item.quantity}
  </AppText>

  <AppText variant="caption" color="tertiary">
    {item.quantity_before} → {item.quantity_after}
  </AppText>
</View>
              </View>
            );
          })}
        </AppCard>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 8,
  },
  header: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 8,
},
  sectionLabel: {
    marginBottom: 8,
    marginLeft: 2,
    letterSpacing: 0.4,
  },
  card: {
    borderRadius: 12,
    padding: 2,

    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
});