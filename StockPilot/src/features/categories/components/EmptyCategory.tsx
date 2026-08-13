import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export function EmptyCategory() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="package-variant"
        size={90}
        color="#D1D5DB"
      />

      <Text variant="headlineSmall">
        No Categories
      </Text>

      <Text
        variant="bodyMedium"
        style={styles.subtitle}
      >
        Create your first category.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    alignItems: "center",
  },

  subtitle: {
    marginTop: 10,
    color: "#6B7280",
  },
});