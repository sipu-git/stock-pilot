import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { RootState } from "../../../core/store";

import { logoutApi } from "../../auth/api/authApi";
import { authStorage } from "../../auth/services/authStorage";
import { logout } from "../../auth/store/authSlice";

import {
  PRIVACY_POLICY,
  TERMS_AND_CONDITIONS,
} from "../constants/legalContent";

import { ProfileCard, SettingItem, SettingSection } from "../components";
import ConfirmationDialog from "../../../components/common/ConfirmationDialog";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SettingsStackParamList } from "../../../types/navigation";

export default function SettingsScreen() {
  const dispatch = useDispatch();

  type SettingsNavigationProp = NativeStackNavigationProp<
    SettingsStackParamList,
    "SettingsHome"
  >;

  const navigation = useNavigation<SettingsNavigationProp>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);
  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.log("Logout API failed", err);
    }

    await authStorage.clear();

    dispatch(logout());
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ProfileCard name={user?.name} email={user?.email} role={user?.role} />

      <SettingSection title="Account">
        <SettingItem
          title="Profile"
          leftIcon="account-outline"
          onPress={() => navigation.navigate("Profile")}
        />

        <SettingItem
          title="Change Password"
          leftIcon="lock-outline"
          onPress={() => navigation.navigate("ChangePassword")}
        />
      </SettingSection>

      <SettingSection title="Support">
        <SettingItem
          title="About"
          leftIcon="information-outline"
          onPress={() => navigation.navigate("About")}
        />

        <SettingItem
          title="Privacy Policy"
          leftIcon="shield-check-outline"
          onPress={() =>
            navigation.navigate("Legal", {
              title: "Privacy Policy",
              content: PRIVACY_POLICY,
            })
          }
        />

        <SettingItem
          title="Terms & Conditions"
          leftIcon="file-document-outline"
          showDivider={false}
          onPress={() =>
            navigation.navigate("Legal", {
              title: "Terms & Conditions",
              content: TERMS_AND_CONDITIONS,
            })
          }
        />
      </SettingSection>

      <Button
        mode="contained"
        icon="logout"
        buttonColor="#D32F2F"
        style={styles.logoutButton}
        onPress={() => setLogoutDialogVisible(true)}
      >
        Logout
      </Button>

      <ConfirmationDialog
        visible={logoutDialogVisible}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        onDismiss={() => setLogoutDialogVisible(false)}
        onConfirm={async () => {
          setLogoutDialogVisible(false);
          await handleLogout();
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    padding: 16,
  },

  logoutButton: {
  marginTop: 32,
  marginBottom: 24,
},

  content: {
  padding: 16,
  paddingBottom: 40,
},
});
