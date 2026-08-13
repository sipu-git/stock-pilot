import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAppTheme } from "../../../core/theme/useAppTheme";



import AppHeader from "../../../components/common/AppHeader";
import { SettingsStackParamList } from "../../../types/navigation";
import SettingsScreen from "../../../features/settings/screens/SettingsScreen";
import ProfileScreen from "../../../features/settings/screens/ProfileScreen";
import EditProfileScreen from "../../../features/settings/screens/EditProfileScreen";
import ChangePasswordScreen from "../../../features/settings/screens/ChangePasswordScreen";
import AboutScreen from "../../../features/settings/screens/AboutScreen";
import LegalScreen from "../../../features/settings/screens/LegalScreen";

const Stack =
  createNativeStackNavigator<SettingsStackParamList>();

export function SettingsStack() {
  const { colors } = useAppTheme();

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="SettingsHome"
        component={SettingsScreen}
        options={{
          header: () => (
            <AppHeader
              title="Settings"
            />
          ),
        }}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
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
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          title: "Change Password",
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
        name="About"
        component={AboutScreen}
        options={{
          title: "About",
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
    name="Legal"
    component={LegalScreen}
    options={{
          title: "Privacy Policy",
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
  name="EditProfile"
  component={EditProfileScreen}
  options={{
    title: "Edit Profile",
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