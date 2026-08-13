import React, { useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  LineChart,
  lineDataItem,
} from "react-native-gifted-charts";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { AppCard, AppText } from "../../../components/ui";
import { useAppTheme } from "../../../core/theme/useAppTheme";
import { TrendItem } from "../types";

type Props = {
  data: TrendItem[];
};

const CHART_WIDTH = Dimensions.get("window").width - 72;

export default function InventoryTrendChart({
  data,
}: Props) {
  const { colors } = useAppTheme();

  const stockInData = useMemo<lineDataItem[]>(() => {
    return data.map((item) => ({
      value: item.stock_in,
      label: item.day,
      dataPointText: item.stock_in.toString(),
    }));
  }, [data]);

  const stockOutData = useMemo<lineDataItem[]>(() => {
    return data.map((item) => ({
      value: item.stock_out,
      label: item.day,
      dataPointText: item.stock_out.toString(),
    }));
  }, [data]);

  if (!data.length) {
    return (
      <AppCard style={styles.card}>
        <AppText variant="titleMedium">
          Inventory Trend
        </AppText>

        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="chart-line"
            size={48}
            color={colors.onSurfaceVariant}
          />

          <AppText
            variant="bodyMedium"
            color="secondary"
            style={styles.emptyText}
          >
            No trend data available
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
            Inventory Trend
          </AppText>

          <AppText
            variant="bodySmall"
            color="secondary"
          >
            Stock movement over the last days
          </AppText>
        </View>

        <MaterialCommunityIcons
          name="chart-line"
          size={28}
          color={colors.primary}
        />
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendDot,
              {
                backgroundColor: colors.success,
              },
            ]}
          />

          <AppText variant="bodySmall">
            Stock In
          </AppText>
        </View>

        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendDot,
              {
                backgroundColor: colors.error,
              },
            ]}
          />

          <AppText variant="bodySmall">
            Stock Out
          </AppText>
        </View>
      </View>

            <LineChart
        areaChart
        curved
        animateOnDataChange
        isAnimated
        animationDuration={1200}
        data={stockInData}
        data2={stockOutData}
        width={CHART_WIDTH}
        height={240}
        spacing={120}
        initialSpacing={20}
        endSpacing={20}
        color={colors.success}
        color2={colors.error}
        startFillColor={colors.success}
        endFillColor={colors.success}
        startOpacity={0.28}
        endOpacity={0.02}
        startFillColor2={colors.error}
        endFillColor2={colors.error}
        startOpacity2={0.15}
        endOpacity2={0.01}
        thickness={4}
        thickness2={4}
        hideRules={false}
        rulesColor={colors.divider}
        rulesType="solid"
        yAxisColor={colors.divider}
        xAxisColor={colors.divider}
        yAxisTextStyle={{
          color: colors.textSecondary,
          fontSize: 11,
        }}
        xAxisLabelTextStyle={{
          color: colors.textSecondary,
          fontSize: 11,
        }}
        noOfSections={5}
        maxValue={Math.max(
          ...stockInData.map(i => i.value),
          ...stockOutData.map(i => i.value)
        )}
        dataPointsColor={colors.success}
        dataPointsColor2={colors.error}
        dataPointsRadius={5}
        dataPointsRadius2={5}
        textColor={colors.onSurface}
        textShiftY={-10}
        textFontSize={11}
        showVerticalLines={false}
        showXAxisIndices
        xAxisIndicesHeight={4}
        xAxisIndicesColor={colors.primary}
        pointerConfig={{
          pointerStripHeight: 240,
          pointerStripColor: colors.primary,
          pointerStripWidth: 2,
          radius: 7,
          pointerColor: colors.primary,

          activatePointersOnLongPress: true,

          autoAdjustPointerLabelPosition: true,

          pointerLabelComponent: (items: any) => {
            return (
              <View
                style={[
                  styles.tooltip,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <AppText variant="label">
                  {items[0]?.label}
                </AppText>

                <AppText
                  variant="bodySmall"
                  style={{
                    color: colors.success,
                  }}
                >
                  Stock In : {items[0]?.value}
                </AppText>

                <AppText
                  variant="bodySmall"
                  style={{
                    color: colors.error,
                  }}
                >
                  Stock Out : {items[1]?.value}
                </AppText>
              </View>
            );
          },
        }}
      />
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

  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },

  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },

  tooltip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    minWidth: 120,
    elevation: 4,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },

  emptyText: {
    marginTop: 12,
    textAlign: "center",
  },
});