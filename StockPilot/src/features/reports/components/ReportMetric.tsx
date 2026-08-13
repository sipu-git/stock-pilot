import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";


import { useAppTheme } from "../../../core/theme/useAppTheme";
import { AppCard, AppText } from "../../../components/ui";

interface ReportMetricProps {
  label: string;
  value: string | number;
}

export default function ReportMetric({
  label,
  value,
}: ReportMetricProps) {
  const { colors } = useAppTheme();

  return (
    <AppCard elevated={false} style={styles.card}>
      <View style={styles.container}>
        <AppText
          variant="bodyMedium"
          color="secondary"
        >
          {label}
        </AppText>

        <AppText
          variant="titleLarge"
          style={[
            styles.value,
            {
              color: colors.primary,
            },
          ]}
        >
          {value}
        </AppText>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    paddingVertical: 18,
  },

  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  value: {
    marginTop: 8,
  },
});