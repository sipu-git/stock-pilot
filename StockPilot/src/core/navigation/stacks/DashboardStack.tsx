import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashboardScreen from "../../../features/dashboard/screens/DashboardScreen";
import InventoryHistoryScreen from "../../../features/inventory/screens/InventoryHistoryScreen";
import { useAppTheme } from "../../theme/useAppTheme";
import TransactionDetailsScreen from "../../../features/inventory/screens/TransactionDetailsScreen";

const Stack = createNativeStackNavigator();

export function DashboardStack() {
    const { colors } = useAppTheme();
  return (
    <Stack.Navigator
    >
      <Stack.Screen
        name="DashboardHome"
        component={DashboardScreen}
        options={{
      headerShown: false,
    }}
      />

      <Stack.Screen
    name="InventoryHistory"
    component={InventoryHistoryScreen}
    options={{
          title: "Inventory History",
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
  name="TransactionDetails"
  component={TransactionDetailsScreen}
  options={{
    title: "Transaction Details",
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