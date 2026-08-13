import React from "react";
import { StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";


import { useAppTheme } from "../../core/theme/useAppTheme";
import AppText from "./AppText";
import AppButton from "./AppButton";

interface ErrorViewProps {
  title?: string;
  message?: string;
  buttonText?: string;
  onRetry?: () => void;
}

export default function ErrorView({
  title = "Something went wrong",
  message = "We couldn't load the requested information.",
  buttonText = "Try Again",
  onRetry,
}: ErrorViewProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="alert-circle-outline"
        size={72}
        color={colors.error}
      />

      <AppText
        variant="headlineSmall"
        style={styles.title}
      >
        {title}
      </AppText>

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

      {onRetry && (
        <AppButton
          mode="contained"
          onPress={onRetry}
          style={styles.button}
        >
          {buttonText}
        </AppButton>
      )}
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

  title: {
    marginTop: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  message: {
    marginTop: 8,
    textAlign: "center",
    lineHeight: 22,
  },

  button: {
    marginTop: 24,
    minWidth: 160,
  },
});