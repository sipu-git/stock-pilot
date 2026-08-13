import React from "react";
import { StyleSheet, View, useColorScheme } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Animated, { FadeInDown } from "react-native-reanimated";

import { useAppTheme } from "../../../core/theme/useAppTheme";
import { AppCard, AppText } from "../../../components/ui";

interface Props {
  value: number;
}

export default function InventoryValueCard({ value }: Props) {
  const { colors } = useAppTheme();
  const isDark = useColorScheme() === "dark";

  const formattedValue = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

  return (
    <Animated.View entering={FadeInDown.delay(200).duration(350).springify()}>
      <AppCard
        style={[
          styles.card,
          {
            backgroundColor: colors.surface,
            shadowColor: isDark ? "#000" : colors.primaryDark,
          },
        ]}
      >
        <View
          style={[styles.iconContainer, { backgroundColor: colors.successContainer }]}
        >
          <MaterialCommunityIcons name="cash-multiple" size={16} color={colors.success} />
        </View>

        <View style={{ flex: 1 }}>
          <AppText variant="caption" color="secondary">
            Total inventory value
          </AppText>
          <AppText variant="titleLarge" style={styles.amount}>
            {formattedValue}
          </AppText>
        </View>
      </AppCard>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 18,
    marginTop: 10,
    borderRadius: 14,
    padding: 12,

    flexDirection: "row",
    alignItems: "center",

    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    elevation: 3,
  },
  iconContainer: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  amount: {
    marginTop: 1,
  },
});