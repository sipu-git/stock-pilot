import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { AppText } from "../../../components/ui";
import { useAppTheme } from "../../../core/theme/useAppTheme";

interface Props {
  search: string;
}

export default function EmptyProductReport({
  search,
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name="chart-box-outline"
        size={72}
        color={colors.outline}
      />

      <AppText
        variant="headlineSmall"
        style={styles.title}
      >
        No Products Found
      </AppText>

      <AppText
        variant="bodyMedium"
        color="secondary"
        style={styles.subtitle}
      >
        {search
          ? `No product matched "${search}".`
          : "There are no products available to generate this report."}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginTop: 20,
  },

  subtitle: {
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 24,
  },
});