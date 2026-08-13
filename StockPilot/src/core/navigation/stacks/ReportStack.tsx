import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAppTheme } from "../../theme/useAppTheme";

import AppHeader from "../../../components/common/AppHeader";

import ReportsHomeScreen from "../../../features/reports/screens/ReportsHomeScreen";
import InventoryValuationScreen from "../../../features/reports/screens/InventoryValuationScreen";
import CategoryReportScreen from "../../../features/reports/screens/CategoryReportScreen";
import ProductReportScreen from "../../../features/reports/screens/ProductReportScreen";

import { ReportStackParamList } from "../../../types/navigation";

const Stack =
  createNativeStackNavigator<ReportStackParamList>();

export function ReportStack() {
  const { colors } = useAppTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReportsHome"
        component={ReportsHomeScreen}
        options={{
          headerTitleAlign: "center",
          header: () => (
            <AppHeader title="Reports" />
          ),
        }}
      />

      <Stack.Screen
        name="InventoryValuation"
        component={InventoryValuationScreen}
        options={{
          title: "Inventory Valuation",
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
        name="CategoryReport"
        component={CategoryReportScreen}
        options={{
          title: "Category Report",
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
        name="ProductReport"
        component={ProductReportScreen}
        options={{
          title: "Product Performance",
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