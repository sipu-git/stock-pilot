import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";

type Props = {
  name?: string;
  email?: string;
  role?: string;
  onPress?: () => void;
};

export default function ProfileCard({
  name,
  email,
  role,
}: Props) {
  return (
    <Card mode="contained">
      <Card.Content>
        <View style={styles.container}>
          <Avatar.Text
            size={72}
            label={name?.charAt(0).toUpperCase() || "U"}
          />

          <Text
            variant="titleLarge"
            style={styles.name}
          >
            {name || "Unknown User"}
          </Text>

          <Text
            variant="bodyMedium"
            style={styles.email}
          >
            {email}
          </Text>

          {role ? (
            <Text
              variant="bodySmall"
              style={styles.role}
            >
              {role}
            </Text>
          ) : null}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },

  name: {
    marginTop: 12,
    fontWeight: "700",
  },

  email: {
    marginTop: 4,
  },

  role: {
    marginTop: 4,
    opacity: 0.7,
  },
});