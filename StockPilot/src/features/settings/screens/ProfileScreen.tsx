import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootState } from "../../../core/store";
import { SettingsStackParamList } from "../../../types/navigation";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  SettingsStackParamList,
  "Profile"
>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  return (
    <View style={styles.container}>
      <Card mode="contained" style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <Avatar.Text
              size={90}
              label={user?.name?.charAt(0).toUpperCase() || "U"}
            />

            <Text
              variant="headlineSmall"
              style={styles.name}
            >
              {user?.name}
            </Text>

            <Text
              variant="bodyLarge"
              style={styles.email}
            >
              {user?.email}
            </Text>

            <Text
              variant="bodyMedium"
              style={styles.role}
            >
              {user?.role}
            </Text>

            <Button
              mode="contained"
              icon="account-edit"
              style={styles.editButton}
              onPress={() =>
                navigation.navigate("EditProfile")
              }
            >
              Edit Profile
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    padding: 16,
  },

  card: {
    borderRadius: 16,
  },

  header: {
    alignItems: "center",
    paddingVertical: 24,
  },

  name: {
    marginTop: 16,
    fontWeight: "700",
  },

  email: {
    marginTop: 6,
  },

  role: {
    marginTop: 6,
    opacity: 0.7,
    textTransform: "capitalize",
  },

  editButton: {
    marginTop: 24,
    width: "100%",
  },
});