import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoryScreen from "../../../features/categories/screens/CategoryScreen";
import AddCategoryScreen from "../../../features/categories/screens/AddCategoryScreen";
import EditCategoryScreen from "../../../features/categories/screens/EditCategoryScreen";
import AppHeader from "../../../components/common/AppHeader";
import { useAppTheme } from "../../theme/useAppTheme";
import { CategoryStackParamList } from "../../../types/navigation";

const Stack =
  createNativeStackNavigator<CategoryStackParamList>();
export function CategoryStack() {
  const { colors } = useAppTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoryList"
        component={CategoryScreen}
        options={({ navigation }) => ({
          header: () => (
            <AppHeader
              title="Categories"
              rightIcon="add"
              onRightPress={() => navigation.navigate("AddCategory")}
            />
          ),
        })}
      />

      <Stack.Screen
        name="AddCategory"
        component={AddCategoryScreen}
        options={{
          title: "Add Category",
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
        name="EditCategory"
        component={EditCategoryScreen}
        options={{
          title: "Edit Category",
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
