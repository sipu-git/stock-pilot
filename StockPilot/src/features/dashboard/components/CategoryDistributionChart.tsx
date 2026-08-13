import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { AppCard, AppText } from "../../../components/ui";
import { useAppTheme } from "../../../core/theme/useAppTheme";
import { CategoryDistributionItem } from "../types";

type Props = {
  data: CategoryDistributionItem[];
};

export default function CategoryDistributionChart({
  data,
}: Props) {
  const { colors } = useAppTheme();

  const chartColors = [
    colors.primary,
    colors.success,
    colors.warning,
    colors.info,
    "#EC4899",
    "#14B8A6",
    "#6366F1",
    "#F97316",
  ];

  const pieData = useMemo(() => {
    return data.map((item, index) => ({
      value: item.total_products,
      text: `${item.total_products}`,
      color: chartColors[index % chartColors.length],
      label: item.category,
    }));
  }, [data]);

  if (!data.length) {
    return (
      <AppCard style={styles.card}>
        <AppText variant="titleMedium">
          Category Distribution
        </AppText>

        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="chart-donut"
            size={48}
            color={colors.onSurfaceVariant}
          />

          <AppText
            variant="bodyMedium"
            color="secondary"
            style={styles.emptyText}
          >
            No category data available
          </AppText>
        </View>
      </AppCard>
    );
  }

  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <View>
          <AppText
            variant="titleMedium"
            style={styles.title}
          >
            Category Distribution
          </AppText>

          <AppText
            variant="bodySmall"
            color="secondary"
          >
            Products grouped by category
          </AppText>
        </View>

        <MaterialCommunityIcons
          name="chart-donut"
          size={28}
          color={colors.primary}
        />
      </View>

            <View style={styles.chartContainer}>
        <PieChart
          data={pieData}
          donut
          radius={95}
          innerRadius={58}
          showText
          textColor={colors.onSurface}
          textSize={13}
          strokeWidth={2}
          strokeColor={colors.surface}
          focusOnPress
          showGradient
          sectionAutoFocus
          centerLabelComponent={() => (
            <View style={styles.centerLabel}>
              <AppText variant="headlineSmall">
                {data.reduce(
                  (sum, item) => sum + item.total_products,
                  0
                )}
              </AppText>

              <AppText
                variant="bodySmall"
                color="secondary"
              >
                Products
              </AppText>
            </View>
          )}
        />
      </View>

      <View style={styles.legendContainer}>
        {pieData.map((item, index) => (
          <View
            key={`${item.label}-${index}`}
            style={styles.legendRow}
          >
            <View style={styles.legendLeft}>
              <View
                style={[
                  styles.legendDot,
                  {
                    backgroundColor: item.color,
                  },
                ]}
              />

              <AppText
                variant="bodyMedium"
                numberOfLines={1}
                style={styles.categoryName}
              >
                {item.label}
              </AppText>
            </View>

            <AppText variant="labelLarge">
              {item.value}
            </AppText>
          </View>
        ))}
      </View>
    </AppCard>
  );
}


const styles = StyleSheet.create({
  card: {
    marginHorizontal: 18,
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    marginBottom: 4,
  },

  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },

  centerLabel: {
    justifyContent: "center",
    alignItems: "center",
  },

  legendContainer: {
    marginTop: 24,
  },

  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  legendLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },

  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },

  categoryName: {
    flex: 1,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },

  emptyText: {
    marginTop: 12,
    textAlign: "center",
  },
});