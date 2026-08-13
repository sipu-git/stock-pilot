import React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { useAppTheme } from "../../core/theme/useAppTheme";
import AppText from "./AppText";

interface AppLoaderProps {
  message?: string;
}

export default function AppLoader({
  message = "Loading...",
}: AppLoaderProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color={colors.primary}
      />

      <AppText
        variant="bodyMedium"
        style={[
          styles.message,
          {
            color: colors.onSurfaceVariant,
          },
        ]}
      >
        {message}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  message: {
    marginTop: 16,
  },
});